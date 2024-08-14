import mongoose, { Schema, Document, Types } from 'mongoose';
import { AvailableGenders, AvailableUserRoles, UserRolesEnum } from '../constants';
import { CreateUserDto, UserDto } from '../controllers/user/dto';
import { ApiError } from '../utils/api-error';



export const userSchema = new Schema(
    {
        email: {
            type: String,
            required: true,
            unique: true,
            index: true
        },
        firstName: {
            type: String,
            required: true,
            index: true
        },
        lastName: {
            type: String,
            default: null
        },
        dob: {
            type: Date,
            required: true
        },
        address: {
            type: String,
        },
        phoneNumber: {
            type: String,
            required: true,
            minlength: 10,
            maxlength: 10,
        },
        state: {
            type: String
        },
        zipCode: {
            type: String,
        },
        gender: {
            type: String,
            required: true,
            enum: [...AvailableGenders,null],
            default: null
        },
        userType: {
            type: String,
            required: true,
            enum: [...AvailableUserRoles],
            default: UserRolesEnum.ACTIVE_CLIENT
        }
    },
    {
        timestamps: true
    }
)


export const UserModel = mongoose.model('User', userSchema);



export const getUsers = (): Promise<UserDto[]> => UserModel.find();
export const getUserById = (userId: string): Promise<UserDto | any> => UserModel.findOne({ _id: userId });
export const deleteUserById = (userId: string): any => UserModel.findOneAndDelete({ _id: userId });

export const createSingleUser = async (payload: CreateUserDto): Promise<any> => {
    try {
        const res = await UserModel.updateOne(
            { _id: payload._id },
            { $set: payload },
            { upsert: true }
        );
        return res;
    } catch (error) {
        throw new ApiError(500, "Something went wrong while creating the single user");
    }
}

export const updateSingleUser = async (payload: CreateUserDto): Promise<any> => {
    try {
        const res = await UserModel.updateOne(
            { _id: payload._id },
            { $set: payload },
            { upsert: true }
        );
        return res;
    } catch (error) {
        throw new ApiError(500, "Something went wrong while updating the single user");
    }
}


export const createMultipleUsers = async (payloads: CreateUserDto[]): Promise<number> => {
    try {

        const batchSize = 1000;
        let startIndex = 0;
        let endIndex = 1000;
       
        while (startIndex < payloads.length) {
            const batch = payloads.slice(startIndex, endIndex)
            
           // Prepare bulk operations for the current batch
           const bulkOps = batch.map(payload => ({
            updateOne: {
                filter: { _id: payload._id },
                update: { $set: payload },
                upsert: true
            }
            }));

            // Execute bulkWrite for the current batch
            const batchResult = await UserModel.bulkWrite(bulkOps, { ordered: true });

            startIndex = startIndex + batchSize;
            endIndex = endIndex + batchSize;
        }

        return payloads.length;
    } catch (error) {
        throw new ApiError(500, "Something went wrong while creating users in batch");
    }
}