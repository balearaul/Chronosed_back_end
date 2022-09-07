import { Db } from 'mongodb';
import { MongoClient } from 'mongodb';

let cachedDb: Db;
let client: MongoClient;
const MONGODB_URI: any = process.env.MONGODB_URI;
// const DB_NAME: any = process.env.DB_NAME;

const connectToDatabase = async (databaseName:string) => {
  
  if (cachedDb) {
    console.log("Existing cached connection found!");
    return cachedDb;
  }
  console.log("Aquiring new DB connection....");
  try {
    // Connect to our MongoDB database hosted on MongoDB Atlas
    console.log("Aquiring new DB connection....");
    client = await MongoClient.connect(MONGODB_URI,{socketTimeoutMS: 30000});

    // Specify which database we want to use
    const db = await client.db(databaseName);
    console.log("Aquired new DB connection successfully!");
    cachedDb = db;
    return db;
  } catch (error) {
    console.log("ERROR aquiring DB Connection!");
    console.log(error);
    throw error;
  }
};

export default connectToDatabase;