import mongoose, { Schema, Document, Types } from 'mongoose';

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

export const UserSchemaModel = mongoose.model('UserAccount', userAccountSchema);



