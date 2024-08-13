import mongoose, { Schema, Document, Types } from 'mongoose';


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



