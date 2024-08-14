import mongoose, { Schema, Document, Types } from 'mongoose';
import { CreatePolicyDto, PolicyDto } from '../controllers/policy/dto';
import { ApiError } from '../utils/api-error';


export const policySchema = new Schema(
    {

        policyNumber: {
            type: String,
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
        policyCompanyId: {
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
export const getPolicyByPolicyNumber = (PolicyNumber: string): Promise<PolicyDto | any> => PolicyModel.findOne({ policyNumber: PolicyNumber });
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

export const createMultiplePolices = async (payloads: CreatePolicyDto[]): Promise<number> => {
    try {

        const batchSize = 1000;
        let startIndex = 0;
        let endIndex = 1000;
       
        while (startIndex < payloads.length) {
            const batch = payloads.slice(startIndex, endIndex)
            
           // Prepare bulk operations for the current batch
           const bulkOps = batch.map(payload => ({
            updateOne: {
                filter: { policyNumber: payload.policyNumber },
                update: { $set: payload },
                upsert: true
            }
            }));

            // Execute bulkWrite for the current batch
            await PolicyModel.bulkWrite(bulkOps, { ordered: true });

            startIndex = startIndex + batchSize;
            endIndex = endIndex + batchSize;
        }

        return payloads.length;
    } catch (error) {
        throw new ApiError(500, "Something went wrong while creating policies in batch");
    }
}

export const getPolicyInfoWithAggregationByUserId = async (userId: string): Promise<PolicyDto[]> => {
    try {
        const policies = await PolicyModel.find({userId: userId})
         .populate('policyCategoryId')
         .populate('policyCompanyId')
         .populate('userId')
         .exec();

         return policies;

    } catch (error) {
        throw new ApiError(500, "Something went wrong while find policy info by userId");
    }
}

export const getPoliciesAggregationForEachUser = async (page: number, limit: number): Promise<PolicyDto[]> => {
    try {
        const aggregatedPolicies = await PolicyModel.aggregate([
            {
                $lookup: {
                    from: 'users',
                    localField: 'userId',
                    foreignField: '_id',
                    as: 'userInfo'
                }
            },
            {
                $unwind: '$userInfo'
            },
            {
                $group: {
                    _id: '$userId',
                    userInfo: { $first: '$userInfo' },
                    policies: {
                        $push: {
                            policyNumber: '$policyNumber',
                            policyStartDate: '$policyStartDate',
                            policyEndDate: '$policyEndDate',
                            policyCategoryId: '$policyCategoryId',
                            policyCompanyId: '$policyCompanyId',
                            createdAt:  '$createdAt',
                            updatedAt: '$updatedAt'
                        }
                    }
                }
            },
            {
                $skip: (page-1) * limit
            },
            {
                $limit: limit
            }
        ]);

         return aggregatedPolicies;

    } catch (error) {
        throw new ApiError(500, "Something went wrong while find policies info for each user");
    }
}