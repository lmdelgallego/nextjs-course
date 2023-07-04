import { hashPassword } from "../../../lib/auth";
import { connectToDataBase, createIndex, insertDocument } from "../../../lib/db";

async function handler (req, res) {
  if (req.method !== 'POST') {
    return;
  }
  const data = req.body;
  const { email, password } = data;

  if (!email || !email.includes('@') || !password || password.trim().length < 7) {
    res.status(422).json({message: 'Invalid credentials'})
    return;
  }
  const client = await connectToDataBase();
  const hashedPassword = await hashPassword(password);
  await insertDocument(client, 'users', {
    email: email,
    password: hashedPassword
  });

  res.status(201).json({message: 'Created user!'});

}

export default handler;