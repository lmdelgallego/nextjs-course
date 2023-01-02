import { MongoClient } from 'mongodb';

const uri = `mongodb+srv://admin:${process.env.MONGO_PASSWORD}@cluster0.onpg1w3.mongodb.net/${process.env.MONGO_DB}?retryWrites=true&w=majority`;

async function connectDatabase() {
  return await MongoClient.connect(uri)
}

async function insertDocument(client, document) {
  const db = client.db();
  const result = await db.collection('newsletter').insertOne(document);
  return result;
}
async function handler(req, res) {
  let client;
  if (req.method === 'POST') {
    const userEmail = req.body.email;
    console.log(process.env.MONGO_PASSWORD);

    if (!userEmail || !userEmail.includes('@')) {
      res.status(422).json({ message: "Invalid email address." });
      return;
    }

    try {
      client = await connectDatabase()
    }
    catch (error) {
      res.status(500).json({ message: "Connecting to the database failed!" });
      return;
    }

    try {
      await insertDocument(client, { email: userEmail });
      client.close();
    }
    catch (error) {
      res.status(500).json({ message: "Inserting data failed!" });
      return;
    }
    res.status(201).json({ message: "Signed up!" })
  }
}

export default handler;