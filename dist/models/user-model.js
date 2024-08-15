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
exports.createMultipleUsers = exports.updateSingleUser = exports.createSingleUser = exports.deleteUserById = exports.getUserByEmail = exports.getUserById = exports.getUsers = exports.UserModel = exports.userSchema = void 0;
const mongoose_1 = __importStar(require("mongoose"));
const constants_1 = require("../constants");
const api_error_1 = require("../utils/api-error");
exports.userSchema = new mongoose_1.Schema({
    email: {
        type: String,
        required: true,
        unique: true,
        index: true
    },
    firstName: {
        type: String,
        required: true,
        index: true
    },
    lastName: {
        type: String,
        default: null
    },
    dob: {
        type: Date,
        required: true
    },
    address: {
        type: String,
    },
    phoneNumber: {
        type: String,
        required: true,
        minlength: 10,
        maxlength: 10,
    },
    state: {
        type: String
    },
    zipCode: {
        type: String,
    },
    gender: {
        type: String,
        required: true,
        enum: [...constants_1.AvailableGenders, null],
        default: null
    },
    userType: {
        type: String,
        required: true,
        enum: [...constants_1.AvailableUserRoles],
        default: constants_1.UserRolesEnum.ACTIVE_CLIENT
    }
}, {
    timestamps: true
});
exports.UserModel = mongoose_1.default.model('User', exports.userSchema);
const getUsers = () => exports.UserModel.find();
exports.getUsers = getUsers;
const getUserById = (userId) => exports.UserModel.findOne({ _id: userId });
exports.getUserById = getUserById;
const getUserByEmail = (email) => exports.UserModel.findOne({ email: email });
exports.getUserByEmail = getUserByEmail;
const deleteUserById = (userId) => exports.UserModel.findOneAndDelete({ _id: userId });
exports.deleteUserById = deleteUserById;
const createSingleUser = async (payload) => {
    try {
        const res = await exports.UserModel.updateOne({ _id: payload._id }, { $set: payload }, { upsert: true });
        return res;
    }
    catch (error) {
        throw new api_error_1.ApiError(500, "Something went wrong while creating the single user");
    }
};
exports.createSingleUser = createSingleUser;
const updateSingleUser = async (payload) => {
    try {
        const res = await exports.UserModel.updateOne({ _id: payload._id }, { $set: payload }, { upsert: true });
        return res;
    }
    catch (error) {
        throw new api_error_1.ApiError(500, "Something went wrong while updating the single user");
    }
};
exports.updateSingleUser = updateSingleUser;
const createMultipleUsers = async (payloads) => {
    try {
        const batchSize = 1000;
        let startIndex = 0;
        let endIndex = 1000;
        while (startIndex < payloads.length) {
            const batch = payloads.slice(startIndex, endIndex);
            // Prepare bulk operations for the current batch
            const bulkOps = batch.map(payload => ({
                updateOne: {
                    filter: { email: payload.email },
                    update: { $set: payload },
                    upsert: true
                }
            }));
            // Execute bulkWrite for the current batch
            const batchResult = await exports.UserModel.bulkWrite(bulkOps, { ordered: true });
            startIndex = startIndex + batchSize;
            endIndex = endIndex + batchSize;
        }
        return payloads.length;
    }
    catch (error) {
        throw new api_error_1.ApiError(500, "Something went wrong while creating users in batch");
    }
};
exports.createMultipleUsers = createMultipleUsers;
