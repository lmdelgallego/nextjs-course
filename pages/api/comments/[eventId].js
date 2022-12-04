// comments/[eventId].js

function handler(req, res) {

  const eventId = req.query.eventId;

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
      id: new Date().toISOString(),
      email,
      name,
      text,
    }
    console.log(newComment);
    res.status(201).json({ message: "Added comment!", comment: newComment })
  }

  if (req.method === 'GET') {
    const dummyList = [
      { id: 'c1', name: 'Max', text: 'A first comment!' },
      { id: 'c2', name: 'Manuel', text: 'A second comment!' },
    ];
    res.status(201).json({ comments: dummyList });
  }
}

export default handler;