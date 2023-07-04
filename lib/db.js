import { MongoClient } from 'mongodb';

export async function connectToDataBase () {
  const client = await MongoClient.connect(process.env.MONGODB_URI)
  return client
}

export function getDataBase(client) {
  const db = client.db(process.env.MONGO_DB)
  return db
}

export async function insertDocument (client, collection, document) {
  const db = getDataBase(client)
  const result = await db.collection(collection).insertOne(document)
  return result
}

export async function createIndex(client, collection, index) {
  const db = getDataBase(client)
  const result = await db.collection(collection).createIndex(index)
  return result
}