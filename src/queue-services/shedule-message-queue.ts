require("dotenv").config()
import Bull from "bull";
import Redis from "ioredis";
import { sheduleMessageProcessor } from "./shedule-message-processor";
import { ApiError } from "../utils/api-error";

const bullOptions = {
     redis: {
        host: process.env.REDIS_HOST || "localhost",
        port: +process.env.REDIS_PORT  || 6379,
        password: process.env.REDIS_PASSWORD || "",
        tls: {}
    }
}

// Create a Redis client instance to manually check the connection
const redisClient = new Redis(bullOptions.redis);

const sheduleMessageQueue = new Bull('shedule-message-queue', bullOptions);


export const addSheduleMessageToQueue = async (message: string, scheduledDate: Date) => {
    try {
        // Ping Redis to check the connection status
        await redisClient.ping();

        const job = await sheduleMessageQueue.add(
            { message },
            {
                delay: scheduledDate.getTime() - Date.now(),
                removeOnComplete: true
            }
        );
        return job.id;
    } catch (error) {
        // Throw an error if Redis connection fails
        throw new ApiError(400, error.message);
    }
};

sheduleMessageProcessor(sheduleMessageQueue)