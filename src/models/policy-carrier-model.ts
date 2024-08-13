import mongoose, { Schema, Document, Types } from 'mongoose';


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
