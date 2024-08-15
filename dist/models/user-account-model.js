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
exports.createMultipleUserAccounts = exports.updateSingleUserAccount = exports.createSingleUserAccount = exports.deleteUserAccountById = exports.getUserAccountByAccountName = exports.getUserAccountById = exports.getUserAccounts = exports.UserAccountModel = exports.userAccountSchema = void 0;
const mongoose_1 = __importStar(require("mongoose"));
const api_error_1 = require("../utils/api-error");
exports.userAccountSchema = new mongoose_1.Schema({
    accountName: {
        type: String,
        required: true
    },
    userId: {
        type: mongoose_1.default.Schema.Types.ObjectId,
        ref: 'User'
    },
}, {
    timestamps: true
});
exports.UserAccountModel = mongoose_1.default.model('UserAccount', exports.userAccountSchema);
const getUserAccounts = () => exports.UserAccountModel.find();
exports.getUserAccounts = getUserAccounts;
const getUserAccountById = (userAccountId) => exports.UserAccountModel.findOne({ _id: userAccountId });
exports.getUserAccountById = getUserAccountById;
const getUserAccountByAccountName = (AccountName) => exports.UserAccountModel.findOne({ accountName: AccountName });
exports.getUserAccountByAccountName = getUserAccountByAccountName;
const deleteUserAccountById = (userAccountId) => exports.UserAccountModel.findOneAndDelete({ _id: userAccountId });
exports.deleteUserAccountById = deleteUserAccountById;
const createSingleUserAccount = async (payload) => {
    try {
        const res = await exports.UserAccountModel.updateOne({ _id: payload._id }, { $set: payload }, { upsert: true });
        return res;
    }
    catch (error) {
        throw new api_error_1.ApiError(500, "Something went wrong while creating the single user account");
    }
};
exports.createSingleUserAccount = createSingleUserAccount;
const updateSingleUserAccount = async (payload) => {
    try {
        const res = await exports.UserAccountModel.updateOne({ _id: payload._id }, { $set: payload }, { upsert: true });
        return res;
    }
    catch (error) {
        throw new api_error_1.ApiError(500, "Something went wrong while updating the single user account");
    }
};
exports.updateSingleUserAccount = updateSingleUserAccount;
const createMultipleUserAccounts = async (payloads) => {
    try {
        const batchSize = 1000;
        let startIndex = 0;
        let endIndex = 1000;
        while (startIndex < payloads.length) {
            const batch = payloads.slice(startIndex, endIndex);
            // Prepare bulk operations for the current batch
            const bulkOps = batch.map(payload => ({
                updateOne: {
                    filter: { accountName: payload.accountName },
                    update: { $set: payload },
                    upsert: true
                }
            }));
            // Execute bulkWrite for the current batch
            await exports.UserAccountModel.bulkWrite(bulkOps, { ordered: true });
            startIndex = startIndex + batchSize;
            endIndex = endIndex + batchSize;
        }
        return payloads.length;
    }
    catch (error) {
        throw new api_error_1.ApiError(500, "Something went wrong while creating user accounts in batch");
    }
};
exports.createMultipleUserAccounts = createMultipleUserAccounts;
