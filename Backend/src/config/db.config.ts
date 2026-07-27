import mongoose from "mongoose";

let isConnected = false;

export const connectDB = async (): Promise<void> => {
  if (isConnected) {
    console.log("MongoDB is already connected.");
    return;
  }

  const MONGODB_URI = process.env.MONGODB_URI;

  if (!MONGODB_URI) {
    throw new Error("MONGODB_URI is not defined in the environment variables.");
  }

  try {
    const db = await mongoose.connect(MONGODB_URI, {
      autoIndex: true, // Build indexes automatically
    });
    
    isConnected = db.connections[0]?.readyState === 1;
    console.log(`MongoDB Connected: ${db.connection.host}`);
  } catch (error) {
    if (error instanceof Error) {
      console.error(`MongoDB Connection Error: ${error.message}`);
    } else {
      console.error("Unknown MongoDB connection error.", error);
    }
    process.exit(1);
  }
};

export default connectDB;
