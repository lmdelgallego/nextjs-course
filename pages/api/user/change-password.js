import { getSession } from 'next-auth/client';
import { connectToDataBase, findDocument, updateDocument } from '../../../lib/db';
import { verifyPassword, hashPassword } from '../../../lib/auth';

async function handler(req, res) {
  if (req.method !== 'PATCH') {
    return;
  }

  const session = await getSession({ req: req });

  if (!session) {
    res.status(401).json({ message: 'Not authenticated!' });
    return;
  }

  const userEmail = session.user.email;
  const { newPassword, oldPassword } = req.body;

  const client = await connectToDataBase();
  const user = await findDocument(client, 'users', { email: userEmail });

  if (!user) {
    res.status(404).json({ message: 'User not found' });
    client.close();
    return;
  }

  const currentPassword = user.password;

  const passwordsAreEqual = await verifyPassword(oldPassword, currentPassword);

  if (passwordsAreEqual) {
    res.status(403).json({ message: 'Invalid password' });
    client.close();
    return;
  }

  const hashedPassword = await hashPassword(newPassword);

  const result = await updateDocument(client, 'users',
    { email: userEmail },
    { $set: { password: hashedPassword } }
  );

  if (result.modifiedCount === 0) {
    res.status(500).json({ message: 'Could not update password.' });
    client.close();
    return;
  }

  client.close();
  res.status(200).json({ message: 'Password updated!' });
}

export default handler;