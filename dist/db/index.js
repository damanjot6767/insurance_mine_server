"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const connectDB = async () => {
    try {
        const connectionInstance = await mongoose_1.default.connect(`${process.env.MONGODB_URL}`, {
            socketTimeoutMS: 30000, // 30 seconds timeout for socket operations
            connectTimeoutMS: 30000, // 30 seconds timeout for initial connection
        });
        console.log(`\n MongoDB connected !! DB HOST: ${connectionInstance.connection.host}`);
    }
    catch (error) {
        console.log("MONGODB connection error", error);
        process.exit(1);
    }
};
exports.default = connectDB;
