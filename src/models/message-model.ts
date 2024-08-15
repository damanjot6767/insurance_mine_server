import mongoose, { Schema, Document, Types } from 'mongoose';
import { MessageDto, CreateMessageDto } from '../controllers/message/dto';
import { ApiError } from '../utils/api-error';


export const MessageSchema = new Schema(
    {
        message: {
            type: String,
            required: true
        }
    },
    {
        timestamps: true
    }
)

export const MessageModel = mongoose.model('Message', MessageSchema);


export const getMessages = (): Promise<MessageDto[]> => MessageModel.find();
export const getMessageById = (MessageId: string): Promise<MessageDto | any> => MessageModel.findOne({ _id: MessageId });
export const getMessageByMessageName = (MessageName: string): Promise<MessageDto | any> => MessageModel.findOne({ MessageName: MessageName });
export const deleteMessageById = (MessageId: string): any => MessageModel.findOneAndDelete({ _id: MessageId });

export const createSingleMessage = async (payload: CreateMessageDto): Promise<any> => {
    try {
        const res = await MessageModel.updateOne(
            { _id: payload._id },
            { $set: payload },
            { upsert: true }
        );
        return res;
    } catch (error) {
        throw new ApiError(500, "Something went wrong while creating the single Message");
    }
}

export const updateSingleMessage = async (payload: CreateMessageDto): Promise<any> => {
    try {
        const res = await MessageModel.updateOne(
            { _id: payload._id },
            { $set: payload },
            { upsert: true }
        );
        return res;
    } catch (error) {
        throw new ApiError(500, "Something went wrong while updating the single Message");
    }
}