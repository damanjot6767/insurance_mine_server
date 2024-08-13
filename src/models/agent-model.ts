import mongoose, { Schema, Document, Types } from 'mongoose';


export const agentSchema = new Schema(
    {
        agentName: {
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

export const AgentModel = mongoose.model('Agent', agentSchema);
