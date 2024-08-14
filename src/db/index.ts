import mongoose from "mongoose";
import { PolicyModel } from "../models/policy-model";
import { AgentModel } from "../models/agent-model";

const connectDB = async () => {
  try {
    const connectionInstance = await mongoose.connect(
      `${process.env.MONGODB_URL}`,
      {
        socketTimeoutMS: 30000, // 30 seconds timeout for socket operations
        connectTimeoutMS: 30000, // 30 seconds timeout for initial connection
      }
    );

    await PolicyModel.createCollection()
    await AgentModel.createCollection()
    console.log(
      `\n MongoDB connected !! DB HOST: ${connectionInstance.connection.host}`
    );
  } catch (error) {
    console.log("MONGODB connection error", error);
    process.exit(1);
  }
};

export default connectDB;