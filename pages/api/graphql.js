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

  type Products {
    products: [Product]
    count: Int
  }

  type Query {
    users(id: Int): [User]!
    retailers(ID: Int, Status: String): [Retailer]!
    productPage(search: String, limit: Int, page: Int): Products
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
        productPage: async (_parent, _args, _context, _info) => {
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
                
                let searchName = [] // search by name
                let searchSku = []  // search by sku

                search.forEach((keyword) => { 
                    const regex1 = new RegExp(`${keyword}`, 'i');
                    const regex2 = new RegExp(`\\b(${keyword})\\b`, 'i');
                    searchName = [...searchName, {name: regex2}]
                    searchSku = [...searchSku, {sku: regex1}]
                })

                let searchList = {$or: [{$and: searchName}, ...searchSku]}
                mongoSearch = searchList
                console.log(mongoSearch)
            }
            
            let skip = 0
            if(page>1) {
                skip = limit * (page-1)
            }
            console.log("skip:", skip)
            console.log("limit:", limit)

            const result = await _context.db
                .collection('products')
                .find(mongoSearch).skip(skip).limit(limit)
                .toArray()
            
            console.log(result)

            const pageCount = await _context.db
                .collection('products')
                .find(mongoSearch).count()

            console.log("pageCount: ", pageCount)
            
            return { products: result, count: pageCount }
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