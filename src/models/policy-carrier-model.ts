import mongoose, { Schema, Document, Types } from 'mongoose';
import {  CreatePolicyCarrierDto, PolicyCarrierDto } from '../controllers/policy-carrier/dto';
import { ApiError } from '../utils/api-error';


export const carrierSchema = new Schema(
    {
        companyName: {
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

export const CarrierModel = mongoose.model('Carrier', carrierSchema);


export const getPolicyCarriers = (): Promise<PolicyCarrierDto[]> => CarrierModel.find();
export const getPolicyCarrierById = (CarrierId: string): Promise<PolicyCarrierDto | any> => CarrierModel.findOne({ _id: CarrierId });
export const deletePolicyCarrierById = (CarrierId: string): any => CarrierModel.findOneAndDelete({ _id: CarrierId });

export const createSinglePolicyCarrier = async (payload: CreatePolicyCarrierDto): Promise<any> => {
    try {
        const res = await CarrierModel.updateOne(
            { _id: payload._id },
            { $set: payload },
            { upsert: true }
        );
        return res;
    } catch (error) {
        throw new ApiError(500, "Something went wrong while creating the single Carrier");
    }
}

export const updateSinglePolicyCarrier= async (payload: CreatePolicyCarrierDto): Promise<any> => {
    try {
        const res = await CarrierModel.updateOne(
            { _id: payload._id },
            { $set: payload },
            { upsert: true }
        );
        return res;
    } catch (error) {
        throw new ApiError(500, "Something went wrong while updating the single Carrier");
    }
}