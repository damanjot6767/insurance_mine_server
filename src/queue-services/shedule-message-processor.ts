import { createSingleMessageService } from "../controllers/message/message-service";
import { generateMongooseID } from "../utils/generate-mongo-id";

const sheduleMessageProcessor = (queue)=> {
    queue.process(async (job)=>{
        try {
            const { message } = job.data;

            const messagePayload = {
                _id: generateMongooseID(),
                message: message,
                createdAt: new Date(),
                updatedAt: new Date()
            }
            await createSingleMessageService(messagePayload)
            console.log(`Message processed at ${new Date()}`)
        } catch (error) {
            throw error;
        }
    })
}

export {sheduleMessageProcessor }