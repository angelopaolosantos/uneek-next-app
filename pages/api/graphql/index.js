// pages/api/graphql.js
import { ApolloServer, AuthenticationError } from 'apollo-server-micro'
import schema from './schema'
import { MongoClient } from 'mongodb'

import jwt from 'jsonwebtoken'
import jwksClient from 'jwks-rsa'
import util from 'util'

async function decodeJWT(token) {
    const client = jwksClient({
        jwksUri: `https://${process.env.NEXT_PUBLIC_DOMAIN}/.well-known/jwks.json`
    })

    const getSigningKeyPromise = util.promisify(client.getSigningKey)
    const getSigningKeysPromise = () => {
        return new Promise((resolve, reject) => {
            client.getSigningKeys((err, keys) => {
                if (err) return reject(err)
                resolve(keys)
            })
        })
    }
    const options = {
        audience: `http://localhost:3000/api/graphql`,
        issuer: `https://dev-angelops.us.auth0.com/`,
        algorithms: ['RS256']
    }

    const kid = "DLlqwzRy5Z239Xtm0oD6D"
    try {
        const key = await getSigningKeyPromise(kid)
        const keys = await getSigningKeysPromise()
        const signingkey = key.getPublicKey()
        const userInfo = jwt.verify(token, signingkey, options)
        //console.log(key)
        //console.log(userInfo)
        //console.log(keys)
        return userInfo
    } catch (err) {
        console.log(err)
    }


}

const token = 'eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCIsImtpZCI6IkRMbHF3elJ5NVoyMzlYdG0wb0Q2RCJ9.eyJpc3MiOiJodHRwczovL2Rldi1hbmdlbG9wcy51cy5hdXRoMC5jb20vIiwic3ViIjoieXM0MWZUMkZSSDV4aDFSVWJWMzJQZTAydExxNVNQaTFAY2xpZW50cyIsImF1ZCI6Imh0dHA6Ly9sb2NhbGhvc3Q6MzAwMC9hcGkvZ3JhcGhxbCIsImlhdCI6MTU5NzE5MTMwMiwiZXhwIjoxNTk3Mjc3NzAyLCJhenAiOiJ5czQxZlQyRlJINXhoMVJVYlYzMlBlMDJ0THE1U1BpMSIsImd0eSI6ImNsaWVudC1jcmVkZW50aWFscyJ9.VY-wreoVan0FEBXZfj3ybwX_Tvoa9HOI8vnXv7LC60tlQRrZe7wi7E8bzfB8P_9jqLy0_Z8_zIVcKmFyqC0xaNKiVEZRTej5-ycMTmjQXUgMXE_xiPP_tRy2O3BmV6Jqdc-xriXsAHh6mMMkHQZunYvzu31pCgejXJw_f4kQM811v_1LtSMi-20kOjXoCcFNWgjqJ2JZ54b1cxHdkLnMI7fe72ogitYfggZUgeNa2gGSWkjl09BoZPBGxTiwQXwSW2rc3uGvkJ6sFWKz3zJb9v216-5kXkfmnE84SYRa4u2TE-SDa9WxPnhwRUnbGiePu7nD4zEw_oRNwIbsWzeG2w'

let db

const apolloServer = new ApolloServer({
    schema,
    context: async ({ req }) => {
        // db = getDatabase(db)
        const decoded = await decodeJWT(token)

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

        return { db, decoded }
    },
})

export const config = {
    api: {
        bodyParser: false,
    },
}

export default apolloServer.createHandler({ path: '/api/graphql' })