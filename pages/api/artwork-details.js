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
      // return NextResponse.json({ imageList }, { status: 200 });
    } catch (err) {
      res.status(500).json({ message: 'Error retrieving data' });
      // return NextResponse.json({ message: "Error", err }, { status: 500 });
    }
  }
  else {
    res.status(405).json({ message: 'Method Not Allowed' });
  }

}