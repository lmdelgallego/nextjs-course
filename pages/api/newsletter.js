import { MongoClient } from 'mongodb';

const uri = `mongodb+srv://admin:${process.env.MONGO_PASSWORD}@cluster0.onpg1w3.mongodb.net/${process.env.MONGO_DB}?retryWrites=true&w=majority`;

async function handler(req, res) {
  if (req.method === 'POST') {
    const userEmail = req.body.email;
    console.log(process.env.MONGO_PASSWORD);

    if (!userEmail || !userEmail.includes('@')) {
      res.status(422).json({ message: "Invalid email address." });
      return;
    }

    const client = await MongoClient.connect(uri, { useUnifiedTopology: true })
    const db = client.db();
    await db.collection('emails').insertOne({ email: userEmail });
    client.close();
    res.status(201).json({ message: "Signed up!" })
  }
}

export default handler;