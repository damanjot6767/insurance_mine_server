"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.sheduleMessageProcessor = void 0;
const message_service_1 = require("../controllers/message/message-service");
const generate_mongo_id_1 = require("../utils/generate-mongo-id");
const sheduleMessageProcessor = (queue) => {
    queue.process(async (job) => {
        try {
            const { message } = job.data;
            const messagePayload = {
                _id: (0, generate_mongo_id_1.generateMongooseID)(),
                message: message,
                createdAt: new Date(),
                updatedAt: new Date()
            };
            await (0, message_service_1.createSingleMessageService)(messagePayload);
            console.log(`Message processed at ${new Date()}`);
        }
        catch (error) {
            throw error;
        }
    });
};
exports.sheduleMessageProcessor = sheduleMessageProcessor;
