import mongoose, { Schema, Document, Types } from 'mongoose';
import { CreatePolicyDto, PolicyDto } from '../controllers/policy/dto';
import { ApiError } from '../utils/api-error';


export const policySchema = new Schema(
    {

        policyNumber: {
            type: Number,
            unique: true,
            index: true,
            required: true
        },
        policyStartDate: {
            type: Date,
            required: true
        },
        policyEndDate: {
            type: Date,
            required: true
        },
        policyCategoryId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'LOB'
        },
        companyCollectionId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Carrier'
        },
        userId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User'
        },
        
    },
    {
        timestamps: true
    }
)


export const PolicyModel = mongoose.model('Policy', policySchema);


export const getPolicys = (): Promise<PolicyDto[]> => PolicyModel.find();
export const getPolicyById = (PolicyId: string): Promise<PolicyDto | any> => PolicyModel.findOne({ _id: PolicyId });
export const deletePolicyById = (PolicyId: string): any => PolicyModel.findOneAndDelete({ _id: PolicyId });

export const createSinglePolicy = async (payload: CreatePolicyDto): Promise<any> => {
    try {
        const res = await PolicyModel.updateOne(
            { _id: payload._id },
            { $set: payload },
            { upsert: true }
        );
        return res;
    } catch (error) {
        throw new ApiError(500, "Something went wrong while creating the single Policy");
    }
}

export const updateSinglePolicy = async (payload: CreatePolicyDto): Promise<any> => {
    try {
        const res = await PolicyModel.updateOne(
            { _id: payload._id },
            { $set: payload },
            { upsert: true }
        );
        return res;
    } catch (error) {
        throw new ApiError(500, "Something went wrong while updating the single Policy");
    }
}

