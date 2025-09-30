// const { MongoClient, ServerApiVersion } = require('mongodb')
import { MongoClient, Db, Collection } from 'mongodb'
import 'dotenv/config'
import User from '~/models/schemas/User.schema'

const uri = `mongodb+srv://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@twitter.84e4izw.mongodb.net/?retryWrites=true&w=majority&appName=Twitter`

// // Create a MongoClient with a MongoClientOptions object to set the Stable API version
// const client = new MongoClient(uri)

// export async function run() {
//   try {
//     // Connect the client to the server	(optional starting in v4.7)
//     // await client.connect() // i have removed
//     // Send a ping to confirm a successful connection
//     await client.db('admin').command({ ping: 1 })
//     console.log('Pinged your deployment. You successfully connected to MongoDB!')
//   } finally {
//     // Ensures that the client will close when you finish/error
//     await client.close()
//   }
// }

// => Using CLASS for connect to MongoDB

class DatabaseService {
  private client: MongoClient // type of client is MongoClient -> class from mongodb package
  private db: Db
  constructor() {
    this.client = new MongoClient(uri)
    this.db = this.client.db(process.env.DB_NAME)
  }
  async connect() {
    try {
      // Connect the client to the server	(optional starting in v4.7)
      // await client.connect() // i have removed
      // Send a ping to confirm a successful connection
      await this.db.command({ ping: 1 })
      console.log('Pinged your deployment. You successfully connected to MongoDB!')
    } catch (error) {
      console.dir(error)
      throw error
    }
    // finally {
    //   // Ensures that the client will close when you finish/error
    //   // await this.client.close()
    // }
  }

  get users(): Collection<User> {
    return this.db.collection(process.env.DB_USER_COLLECTION_NAME as string)
  }
}
const databaseService = new DatabaseService()
export default databaseService
