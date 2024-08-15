"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.sheduleMessageQueue = exports.connectBull = void 0;
const bull_1 = __importDefault(require("bull"));
const REDIS_URL = process.env.REDIS_URL || 'redis://127.0.0.1:6379';
let sheduleMessageQueue = null;
exports.sheduleMessageQueue = sheduleMessageQueue;
const connectBull = async () => {
    try {
        exports.sheduleMessageQueue = sheduleMessageQueue = new bull_1.default('shedule-message-queue', REDIS_URL);
        // Test the connection
        await sheduleMessageQueue.isReady();
        console.log('Bull connected to Redis successfully.');
    }
    catch (error) {
        console.error('Failed to connect Bull with Redis:', error);
        process.exit(1); // Exit the process if Redis connection fails
    }
};
exports.connectBull = connectBull;
