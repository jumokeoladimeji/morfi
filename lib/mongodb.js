import { MongoClient } from 'mongodb';

if (!process.env.MONGODB_URI) {
    throw new Error('Invalid/Missing environment variable: "MONGODB_URI"');
}

const uri = process.env.MONGODB_URI
const client = new MongoClient(uri);

async function connectToDatabase() {
  try {
    await client.connect();
    console.log('Connected to MongoDB');
    return client.db('art-africa-form').collection('artworks');
  } catch (error) {
    console.error('Error connecting to MongoDB:', error);
  }
}

export default connectToDatabase;

// const URI = process.env.MONGODB_URI
// const options = {
//     serverApi: {
//       version: ServerApiVersion.v1,
//       strict: true,
//       deprecationErrors: true,
//     },
// };

// let client
// let clientPromise

// if (process.env.NODE_ENV === 'development') {
// // In development mode, use a global variable so that the value
// // is preserved across module reloads caused by HMR (Hot Module Replacement).
//   if (!global._mongoClientPromise) {
//     client = new MongoClient(URI, options)
//     global._mongoClientPromise = client.connect()
//   }
//   clientPromise = global._mongoClientPromise
// } else {
// // In production mode, it's best to not use a global variable.
//   client = new MongoClient(URI, options)
//   clientPromise = client.connect()
// }

// export default clientPromise