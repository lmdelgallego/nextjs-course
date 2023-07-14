import { MongoClient } from 'mongodb';

export async function connectToDataBase () {
  const client = await MongoClient.connect(process.env.MONGO_URL)
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

export async function findDocument(client, collection, document) {
  const db = getDataBase(client)
  const result = await db.collection(collection).findOne(document)
  return result
}

export async function updateDocument(client, collection, filter, update) {
  const db = getDataBase(client)
  const result = await db.collection(collection).updateOne(filter, update)
  return result
}