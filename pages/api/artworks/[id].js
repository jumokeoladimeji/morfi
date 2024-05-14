import { ObjectId } from "mongodb";
import connectToDatabase from '@/lib/mongodb';

export default async function handler(req, res) {
    if (req.method === 'GET') {
        try {
            const id = req.url.split('/')[3];
            const collection = await connectToDatabase();
            const data = await collection.findOne({"_id": ObjectId.createFromHexString(id)});
            res.status(200).json({ message: 'Data retrieved successfully', data });
        } catch (err) {
            res.status(500).json({ message: 'Error retrieving data' });
        }
    }

    // if (req.method === 'POST') {
        //     const data = JSON.parse(req.body);
        //     const collection = await connectToDatabase();
        
        //     try {
        //       const result = await collection.insertOne(data);
        //       res.status(201).json({ message: 'Data saved successfully', data: result });
        //     } catch (error) {
        //       console.error('Error saving data:', error);
        //       res.status(500).json({ message: 'Error saving data' });
        //     }
        //   }
}