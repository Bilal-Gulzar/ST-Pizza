import mongoose from "mongoose";

const MONGODB_URI = process.env.MONGO_URI

let cachedDb = null;

export default async function dbConnect() {
  if (cachedDb) {
    return cachedDb;
  }

  try {
    const db = await mongoose.connect(MONGODB_URI);
    console.log("MongoDB connected");
    cachedDb = db;
    return db;
  } catch (err) {
    console.error("Error connecting to MongoDB:", err);
    throw err;
  }
}
