import { NextResponse } from "next/server";
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
  }
  
  if (req.method === 'GET') {
    const collection = await connectToDatabase();
    try {
        const imageList = await collection.find({}).sort({ _id: -1 }).toArray();
        res.status(200).json({ message: 'Data retrieved successfully', data: imageList });
    } catch (err) {
        console.error('Error retrieving data:', err.message); // Detailed error logging
        res.status(500).json({ message: 'Error retrieving data', error: err.message }); // Returning error details
    }
  }
  else {
    res.status(405).json({ message: 'Method Not Allowed' });
  }

}