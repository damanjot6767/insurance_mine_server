import mongoose, { Schema, Document, Types } from 'mongoose';
import { AvailableGenders, AvailableUserRoles, UserRolesEnum } from '../constants';



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
            required: true,
        },
        dob: {
            type: Date,
            required: true
        },
        address: {
            type: String,
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
            type: Number,
            required: true,
            minlength: 6,
            maxlength: 6
        },
        gender: {
            type: String,
            required: true,
            enum: [...AvailableGenders]
        },
        userType: {
            type: String,
            required: true,
            enum: [...AvailableUserRoles],
            default: UserRolesEnum.USER
        }
    },
    {
        timestamps: true
    }
)


export const UserModel = mongoose.model('User', userSchema);