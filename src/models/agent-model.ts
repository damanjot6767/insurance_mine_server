import mongoose, { Schema, Document, Types } from 'mongoose';
import { AgentDto, CreateAgentDto } from '../controllers/agent/dto';
import { ApiError } from '../utils/api-error';


export const agentSchema = new Schema(
    {
        agentName: {
            type: String,
            required: true,
            unique: true,
            index: true
        }
    },
    {
        timestamps: true
    }
)

export const AgentModel = mongoose.model('Agent', agentSchema);


export const getAgents = (): Promise<AgentDto[]> => AgentModel.find();
export const getAgentById = (AgentId: string): Promise<AgentDto | any> => AgentModel.findOne({ _id: AgentId });
export const deleteAgentById = (AgentId: string): any => AgentModel.findOneAndDelete({ _id: AgentId });

export const createSingleAgent = async (payload: CreateAgentDto): Promise<any> => {
    try {
        const res = await AgentModel.updateOne(
            { _id: payload._id },
            { $set: payload },
            { upsert: true }
        );
        return res;
    } catch (error) {
        throw new ApiError(500, "Something went wrong while creating the single agent");
    }
}

export const updateSingleAgent= async (payload: CreateAgentDto): Promise<any> => {
    try {
        const res = await AgentModel.updateOne(
            { _id: payload._id },
            { $set: payload },
            { upsert: true }
        );
        return res;
    } catch (error) {
        throw new ApiError(500, "Something went wrong while updating the single agent");
    }
}


export const createMultipleAgents = async (payloads: CreateAgentDto[]): Promise<number> => {
    try {

        // const batchSize = 1;
        // let startIndex = 0;
        // let endIndex = 1;
       
        // while (startIndex < payloads.length) {
        //     const batch = payloads.slice(startIndex, endIndex)
            
        //    // Prepare bulk operations for the current batch
        //    const bulkOps = batch.map(payload => ({
        //     updateOne: {
        //         filter: { _id: payload._id },
        //         update: { $set: payload },
        //         upsert: true
        //     }
        //     }));

        //     // Execute bulkWrite for the current batch
        //     await AgentModel.bulkWrite(bulkOps, { ordered: true });

        //     startIndex = startIndex + batchSize;
        //     endIndex = endIndex + batchSize;
        // }
        await createSingleAgent(payloads[0])
        return payloads.length;
    } catch (error) {
        throw new ApiError(500, "Something went wrong while creating agents in batch");
    }
}