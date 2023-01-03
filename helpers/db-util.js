import { MongoClient } from 'mongodb';

const uri = `mongodb+srv://admin:${process.env.MONGO_PASSWORD}@cluster0.onpg1w3.mongodb.net/${process.env.MONGO_DB}?retryWrites=true&w=majority`;

export async function connectDatabase() {
  return await MongoClient.connect(uri)
}

export async function insertDocument(client, collection, document) {
  const db = client.db();
  const result = await db.collection(collection).insertOne(document);
  return result;
}

export async function getAllDocuments(client, collection, sort, filter = {}) {
  const db = client.db();
  const documents = await db
    .collection(collection)
    .find(filter)
    .sort(sort)
    .toArray();
  return documents;
}