import mongoose, { Schema, Document, Types } from 'mongoose';
import { CreatePolicyLobDto, PolicyLobDto } from '../controllers/policy-lob/dto';
import { ApiError } from '../utils/api-error';


export const lobSchema = new Schema(
    {
        categoryName: {
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

export const LobModel = mongoose.model('LOB', lobSchema);


export const getPolicyLobs = (): Promise<PolicyLobDto[]> => LobModel.find();
export const getPolicyLobById = (LobId: string): Promise<PolicyLobDto | any> => LobModel.findOne({ _id: LobId });
export const getPolicyLobByCategoryName = (CategoryName: string): Promise<PolicyLobDto | any> => LobModel.findOne({ categoryName: CategoryName });
export const deletePolicyLobById = (LobId: string): any => LobModel.findOneAndDelete({ _id: LobId });

export const createSinglePolicyLob = async (payload: CreatePolicyLobDto): Promise<any> => {
    try {
        const res = await LobModel.updateOne(
            { _id: payload._id },
            { $set: payload },
            { upsert: true }
        );
        return res;
    } catch (error) {
        throw new ApiError(500, "Something went wrong while creating the single Lob");
    }
}

export const updateSinglePolicyLob= async (payload: CreatePolicyLobDto): Promise<any> => {
    try {
        const res = await LobModel.updateOne(
            { _id: payload._id },
            { $set: payload },
            { upsert: true }
        );
        return res;
    } catch (error) {
        throw new ApiError(500, "Something went wrong while updating the single Lob");
    }
}


export const createMultiplePolicyLobies = async (payloads: CreatePolicyLobDto[]): Promise<number> => {
    try {

        const batchSize = 1000;
        let startIndex = 0;
        let endIndex = 1000;
       
        while (startIndex < payloads.length) {
            const batch = payloads.slice(startIndex, endIndex)
            
           // Prepare bulk operations for the current batch
           const bulkOps = batch.map(payload => ({
            updateOne: {
                filter: { categoryName: payload.categoryName },
                update: { $set: payload },
                upsert: true
            }
            }));

            // Execute bulkWrite for the current batch
            await LobModel.bulkWrite(bulkOps, { ordered: true });

            startIndex = startIndex + batchSize;
            endIndex = endIndex + batchSize;
        }

        return payloads.length;
    } catch (error) {
        throw new ApiError(500, "Something went wrong while creating policy lobies in batch");
    }
}