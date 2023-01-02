// comments/[eventId].js
import { MongoClient } from 'mongodb';

const uri = `mongodb+srv://admin:${process.env.MONGO_PASSWORD}@cluster0.onpg1w3.mongodb.net/${process.env.MONGO_DB}?retryWrites=true&w=majority`;

async function connectDatabase() {
  return await MongoClient.connect(uri)
}

async function insertDocument(client, document) {
  const db = client.db();
  const result = await db.collection('comments').insertOne(document);
  return result;
}

async function handler(req, res) {

  const eventId = req.query.eventId;
  let client;

  if (req.method === 'POST') {
    const { email, name, text } = req.body;

    if (!email || !email.includes('@')) {
      res.status(422).json({ message: "Invalid email address." });
      return;
    }

    if (!name || name.trim() === '') {
      res.status(422).json({ message: "Invalid name." });
      return;
    }

    if (!text || text.trim() === '') {
      res.status(422).json({ message: "Invalid comment." });
      return;
    }

    const newComment = {
      email,
      name,
      text,
      eventId
    }

    try {
      client = await connectDatabase()
    } catch (error) {
      res.status(500).json({ message: "Connecting to the database failed!" });
      return;
    }

    try {
      await insertDocument(client, newComment);
      client.close();
    } catch (error) {
      res.status(500).json({ message: "Inserting data failed!" });
      return;
    }
    res.status(201).json({ message: "Added comment!", comment: newComment })
  }

  if (req.method === 'GET') {

    try {
      client = await connectDatabase()
    } catch (error) {
      res.status(500).json({ message: "Connecting to the database failed!" });
      return;
    }

    try {

      const documents = await db
        .collection('comments')
        .find()
        .sort({ _id: -1 })
        .toArray();
      res.status(201).json({ comments: documents });
    } catch (error) {
      res.status(500).json({ message: "Getting comments failed!" });
      return;
    }
  }


}

export default handler;