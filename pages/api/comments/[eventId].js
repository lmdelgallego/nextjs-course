// comments/[eventId].js
import { MongoClient } from 'mongodb';

const uri = `mongodb+srv://admin:${process.env.MONGO_PASSWORD}@cluster0.onpg1w3.mongodb.net/${process.env.MONGO_DB}?retryWrites=true&w=majority`;

async function handler(req, res) {

  const eventId = req.query.eventId;
  const client = await MongoClient.connect(uri)

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

    const db = client.db();
    const result = await db.collection('comments').insertOne(newComment);
    console.log(result);
    res.status(201).json({ message: "Added comment!", comment: newComment })
  }

  if (req.method === 'GET') {
    const db = client.db();
    const documents = await db
      .collection('comments')
      .find()
      .sort({ _id: -1 })
      .toArray();
    res.status(201).json({ comments: documents });
  }

  client.close();
}

export default handler;