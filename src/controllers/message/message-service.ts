import { createSingleMessage, deleteMessageById, getMessageByMessageName, getMessageById, getMessages } from "../../models/message-model";
import { ApiError } from "../../utils/api-error";
import { CreateMessageDto, MessageDto } from "./dto";


export const createSingleMessageService = async (payload: CreateMessageDto): Promise<MessageDto> => {
    try {
        const res = await createSingleMessage(payload);
        return res
    } catch (error) {
        throw error;
    }
}

export const updateSingleMessageService = async (payload: CreateMessageDto): Promise<MessageDto> => {
    try {
        await getMessageByIdService(payload._id);

        const res = await updateSingleMessageService(payload);
        return res
    } catch (error) {
        throw error;
    }
}

export const getMessagesService = async (): Promise<MessageDto[]> => {

    const res = await getMessages()
    return res
}

export const getMessageByIdService = async (MessageId: string): Promise<MessageDto> => {

    const res = await getMessageById(MessageId)
    if(!res) throw new ApiError(400, "not found")
    return res
}

export const getMessageByMessageNameService = async (MessageName: string): Promise<MessageDto | undefined> => {

    const res = await getMessageByMessageName(MessageName)
    return res
}

export const deleteMessageByIdService = async (MessageId: string): Promise<any> => {

    const res = await deleteMessageById(MessageId)
    if(!res) throw new ApiError(400, "not found")
    return res
}
