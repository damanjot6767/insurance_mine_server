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
            required: true
        },
        phoneNumber: {
            type: Number,
            required: true,
            minlength: 10,
            maxlength: 10,
        },
        state: {
            type: String,
            required: true
        },
        zipCode: {
            type: String,
            required: true,
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