// pages/api/graphql.js
import { ApolloServer, gql } from 'apollo-server-micro'
import { makeExecutableSchema } from 'graphql-tools'
import { MongoClient } from 'mongodb'
//import typeDefs from './schema'

const typeDefs = gql`
  type User {
    id: ID!
    firstName: String!
    lastName: String!
    blog: String
    stars: Int
  }

  type Retailer {
      ID: Float!
      Title: String!
      Address: String
      URL: String
      Phone: String
      Longitude: Float
      Latitude: Float
      Status: String
  }

  type Product {
    id: Int
    thumbnail: String
    sku: String
    name: String
    description: String
    product_type: String
    category: String
    gender: String
    price: String
    status: Boolean
    metal: String
    center_size: String
    center_shape: String
    side_stone_weight: String
    side_stone_pieces: String
    images: String
    msrp_14k: String
    msrp_18k: String
    msrp_plat: String
    msrp: String
    gemstone: String
    center_stone: String
    url: String
    meta_keyword: String
    meta_description: String
    meta_title: String
  }

  type Count {
      count: Int
  }

  type Query {
    users(id: Int): [User]!
    retailers(ID: Int, Status: String): [Retailer]!
    products(search: String, limit: Int, page: Int): [Product]
    productsCount(search: String): Count
  }

`

const resolvers = {
    Query: {
        users: async (_parent, _args, _context, _info) => {
            const result = await _context.db
                .collection('users')
                .find(_args)
                .toArray()
            return result
        },
        retailers: async (_parent, _args, _context, _info) => {
            const result = await _context.db
                .collection('retailers')
                .find(_args)
                .toArray()
            return result
        },
        products: async (_parent, _args, _context, _info) => {
            let mongoSearch = {}
            let limit = 9
            if (_args.limit) {
                limit = _args.limit
            }
            let page = 1
            if (_args.page) {
                page = _args.page
            }

            if (_args.search) {
                let search = _args.search.split(" ")

                let searchMatch = search.map((keyword) => {
                    const regex = new RegExp(`${keyword}`, 'i');
                    const regexWord = new RegExp(`\\b(${keyword})\\b`, 'i');
                    return { $or: [{ sku: regex }, { name: regexWord }] }
                })
                mongoSearch = { $and: searchMatch }
            }

            const pageCount = await _context.db
                .collection('products')
                .find(mongoSearch).count()

            let skip = limit * page

            const result = await _context.db
                .collection('products')
                .find(mongoSearch).skip(skip).limit(limit)
                .toArray()

            return result
        },
        productsCount: async (_parent, _args, _context, _info) => {
            let mongoSearch = {}
            if (_args.search) {
                let search = _args.search.split(" ")

                let searchMatch = search.map((keyword) => {
                    const regex = new RegExp(`${keyword}`, 'i');
                    const regexWord = new RegExp(`\\b(${keyword})\\b`, 'i');
                    return { $or: [{ sku: regex }, { name: regexWord }] }
                })
                mongoSearch = { $and: searchMatch }
            }

            const result = await _context.db
                .collection('products')
                .find(mongoSearch).count()

            return {count: result}
        },
    },
}

const schema = makeExecutableSchema({
    typeDefs,
    resolvers,
})

let db

const apolloServer = new ApolloServer({
    schema,
    context: async () => {
        if (!db) {
            try {
                const dbClient = new MongoClient(process.env.NEXT_PUBLIC_MONGO_DB_URI,
                    {
                        useNewUrlParser: true,
                        useUnifiedTopology: true,
                    }
                )

                if (!dbClient.isConnected()) await dbClient.connect()
                db = dbClient.db('uneekdb') // database name
                console.log("connected to mongo database: ", dbClient.isConnected())
            } catch (e) {
                console.log('--->error while connecting with graphql context (db)', e)
            }
        }

        return { db }
    },
})

export const config = {
    api: {
        bodyParser: false,
    },
}

export default apolloServer.createHandler({ path: '/api/graphql' })