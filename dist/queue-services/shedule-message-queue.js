"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.addSheduleMessageToQueue = void 0;
require("dotenv").config();
const bull_1 = __importDefault(require("bull"));
const ioredis_1 = __importDefault(require("ioredis"));
const shedule_message_processor_1 = require("./shedule-message-processor");
const api_error_1 = require("../utils/api-error");
const bullOptions = {
    redis: {
        host: process.env.REDIS_HOST || "localhost",
        port: +process.env.REDIS_PORT || 6379,
        password: process.env.REDIS_PASSWORD || "",
        tls: {}
    }
};
// Create a Redis client instance to manually check the connection
const redisClient = new ioredis_1.default(bullOptions.redis);
const sheduleMessageQueue = new bull_1.default('shedule-message-queue', bullOptions);
const addSheduleMessageToQueue = async (message, scheduledDate) => {
    try {
        // Ping Redis to check the connection status
        await redisClient.ping();
        const job = await sheduleMessageQueue.add({ message }, {
            delay: scheduledDate.getTime() - Date.now(),
            removeOnComplete: true
        });
        return job.id;
    }
    catch (error) {
        // Throw an error if Redis connection fails
        throw new api_error_1.ApiError(400, error.message);
    }
};
exports.addSheduleMessageToQueue = addSheduleMessageToQueue;
(0, shedule_message_processor_1.sheduleMessageProcessor)(sheduleMessageQueue);
