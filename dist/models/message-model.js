"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateSingleMessage = exports.createSingleMessage = exports.deleteMessageById = exports.getMessageByMessageName = exports.getMessageById = exports.getMessages = exports.MessageModel = exports.MessageSchema = void 0;
const mongoose_1 = __importStar(require("mongoose"));
const api_error_1 = require("../utils/api-error");
exports.MessageSchema = new mongoose_1.Schema({
    message: {
        type: String,
        required: true
    }
}, {
    timestamps: true
});
exports.MessageModel = mongoose_1.default.model('Message', exports.MessageSchema);
const getMessages = () => exports.MessageModel.find();
exports.getMessages = getMessages;
const getMessageById = (MessageId) => exports.MessageModel.findOne({ _id: MessageId });
exports.getMessageById = getMessageById;
const getMessageByMessageName = (MessageName) => exports.MessageModel.findOne({ MessageName: MessageName });
exports.getMessageByMessageName = getMessageByMessageName;
const deleteMessageById = (MessageId) => exports.MessageModel.findOneAndDelete({ _id: MessageId });
exports.deleteMessageById = deleteMessageById;
const createSingleMessage = async (payload) => {
    try {
        const res = await exports.MessageModel.updateOne({ _id: payload._id }, { $set: payload }, { upsert: true });
        return res;
    }
    catch (error) {
        throw new api_error_1.ApiError(500, "Something went wrong while creating the single Message");
    }
};
exports.createSingleMessage = createSingleMessage;
const updateSingleMessage = async (payload) => {
    try {
        const res = await exports.MessageModel.updateOne({ _id: payload._id }, { $set: payload }, { upsert: true });
        return res;
    }
    catch (error) {
        throw new api_error_1.ApiError(500, "Something went wrong while updating the single Message");
    }
};
exports.updateSingleMessage = updateSingleMessage;
