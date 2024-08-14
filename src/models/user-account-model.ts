import mongoose, { Schema, Document, Types } from 'mongoose';
import { CreateUserAccountDto, UserAccountDto } from '../controllers/user-account/dto';
import { ApiError } from '../utils/api-error';

export const userAccountSchema = new Schema(
    {
        accountName: {
            type: String,
            required: true
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

export const UserAccountModel = mongoose.model('UserAccount', userAccountSchema);

export const getUserAccounts = (): Promise<UserAccountDto[]> => UserAccountModel.find();
export const getUserAccountById = (userAccountId: string): Promise<UserAccountDto | any> => UserAccountModel.findOne({ _id: userAccountId });
export const getUserAccountByAccountName = (AccountName: string): Promise<UserAccountDto | any> => UserAccountModel.findOne({ accountName: AccountName });
export const deleteUserAccountById = (userAccountId: string): any => UserAccountModel.findOneAndDelete({ _id: userAccountId });

export const createSingleUserAccount = async (payload: CreateUserAccountDto): Promise<any> => {
    try {
        const res = await UserAccountModel.updateOne(
            { _id: payload._id },
            { $set: payload },
            { upsert: true }
        );
        return res;
    } catch (error) {
        throw new ApiError(500, "Something went wrong while creating the single user account");
    }
}

export const updateSingleUserAccount= async (payload: CreateUserAccountDto): Promise<any> => {
    try {
        const res = await UserAccountModel.updateOne(
            { _id: payload._id },
            { $set: payload },
            { upsert: true }
        );
        return res;
    } catch (error) {
        throw new ApiError(500, "Something went wrong while updating the single user account");
    }
}

export const createMultipleUserAccounts = async (payloads: CreateUserAccountDto[]): Promise<number> => {
    try {

        const batchSize = 1000;
        let startIndex = 0;
        let endIndex = 1000;
       
        while (startIndex < payloads.length) {
            const batch = payloads.slice(startIndex, endIndex)
            
           // Prepare bulk operations for the current batch
           const bulkOps = batch.map(payload => ({
            updateOne: {
                filter: { accountName: payload.accountName },
                update: { $set: payload },
                upsert: true
            }
            }));

            // Execute bulkWrite for the current batch
            await UserAccountModel.bulkWrite(bulkOps, { ordered: true });

            startIndex = startIndex + batchSize;
            endIndex = endIndex + batchSize;
        }

        return payloads.length;
    } catch (error) {
        throw new ApiError(500, "Something went wrong while creating user accounts in batch");
    }
}