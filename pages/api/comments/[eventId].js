// comments/[eventId].js
import { connectDatabase, insertDocument, getAllDocuments } from '../../../helpers/db-util';

async function handler(req, res) {

  const eventId = req.query.eventId;
  let client;

  try {
    client = await connectDatabase()
  } catch (error) {
    res.status(500).json({ message: "Connecting to the database failed!" });
    return;
  }


  if (req.method === 'POST') {
    const { email, name, text } = req.body;

    if (!email || !email.includes('@')) {
      res.status(422).json({ message: "Invalid email address." });
      client.close();
      return;
    }

    if (!name || name.trim() === '') {
      res.status(422).json({ message: "Invalid name." });
      client.close();
      return;
    }

    if (!text || text.trim() === '') {
      res.status(422).json({ message: "Invalid comment." });
      client.close();
      return;
    }

    const newComment = {
      email,
      name,
      text,
      eventId
    }

    try {
      const result = await insertDocument(client, 'comments', newComment);
      newComment._id = result.insertedId;
      res.status(201).json({ message: "Added comment!", comment: newComment });
    } catch (error) {
      res.status(500).json({ message: "Inserting data failed!" });
    }
  }

  if (req.method === 'GET') {
    try {
      const documents = getAllDocuments(client, 'comments', { _id: -1 }, { eventId: eventId });
      res.status(201).json({ comments: documents });
    } catch (error) {
      res.status(500).json({ message: "Getting comments failed!" });
    }
  }
  client.close();
}

export default handler;