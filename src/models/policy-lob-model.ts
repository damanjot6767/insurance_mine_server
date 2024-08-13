import mongoose, { Schema, Document, Types } from 'mongoose';


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
