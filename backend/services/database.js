import mongoose from "mongoose";
import "dotenv/config";

async function ConnectToMongoDB() {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log(`MongoDB Connected to ${process.env.MONGO_URI}`);
  } catch (error) {
    console.error(`Error in connecting Database: ${error.message}`);
    throw error;
  }
}

export { ConnectToMongoDB };
