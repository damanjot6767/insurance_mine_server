"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteMessageByIdService = exports.getMessageByMessageNameService = exports.getMessageByIdService = exports.getMessagesService = exports.updateSingleMessageService = exports.createSingleMessageService = void 0;
const message_model_1 = require("../../models/message-model");
const api_error_1 = require("../../utils/api-error");
const createSingleMessageService = async (payload) => {
    try {
        const res = await (0, message_model_1.createSingleMessage)(payload);
        return res;
    }
    catch (error) {
        throw error;
    }
};
exports.createSingleMessageService = createSingleMessageService;
const updateSingleMessageService = async (payload) => {
    try {
        await (0, exports.getMessageByIdService)(payload._id);
        const res = await (0, exports.updateSingleMessageService)(payload);
        return res;
    }
    catch (error) {
        throw error;
    }
};
exports.updateSingleMessageService = updateSingleMessageService;
const getMessagesService = async () => {
    const res = await (0, message_model_1.getMessages)();
    return res;
};
exports.getMessagesService = getMessagesService;
const getMessageByIdService = async (MessageId) => {
    const res = await (0, message_model_1.getMessageById)(MessageId);
    if (!res)
        throw new api_error_1.ApiError(400, "not found");
    return res;
};
exports.getMessageByIdService = getMessageByIdService;
const getMessageByMessageNameService = async (MessageName) => {
    const res = await (0, message_model_1.getMessageByMessageName)(MessageName);
    return res;
};
exports.getMessageByMessageNameService = getMessageByMessageNameService;
const deleteMessageByIdService = async (MessageId) => {
    const res = await (0, message_model_1.deleteMessageById)(MessageId);
    if (!res)
        throw new api_error_1.ApiError(400, "not found");
    return res;
};
exports.deleteMessageByIdService = deleteMessageByIdService;
