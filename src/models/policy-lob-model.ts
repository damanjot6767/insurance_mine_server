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