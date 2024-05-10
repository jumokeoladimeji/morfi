import connectToDatabase from '../../lib/mongodb';

export default async function handler(req, res) {
  if (req.method === 'POST') {
    const data = JSON.parse(req.body);
    const collection = await connectToDatabase();

    try {
      const result = await collection.insertOne(data);
      res.status(201).json({ message: 'Data saved successfully', data: result });
    } catch (error) {
      console.error('Error saving data:', error);
      res.status(500).json({ message: 'Error saving data' });
    }
  } else {
    res.status(405).json({ message: 'Method Not Allowed' });
  }
}