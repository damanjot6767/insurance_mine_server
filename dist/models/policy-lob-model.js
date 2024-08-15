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
exports.createMultiplePolicyLobies = exports.updateSinglePolicyLob = exports.createSinglePolicyLob = exports.deletePolicyLobById = exports.getPolicyLobByCategoryName = exports.getPolicyLobById = exports.getPolicyLobs = exports.LobModel = exports.lobSchema = void 0;
const mongoose_1 = __importStar(require("mongoose"));
const api_error_1 = require("../utils/api-error");
exports.lobSchema = new mongoose_1.Schema({
    categoryName: {
        type: String,
        required: true,
        unique: true,
        index: true
    }
}, {
    timestamps: true
});
exports.LobModel = mongoose_1.default.model('LOB', exports.lobSchema);
const getPolicyLobs = () => exports.LobModel.find();
exports.getPolicyLobs = getPolicyLobs;
const getPolicyLobById = (LobId) => exports.LobModel.findOne({ _id: LobId });
exports.getPolicyLobById = getPolicyLobById;
const getPolicyLobByCategoryName = (CategoryName) => exports.LobModel.findOne({ categoryName: CategoryName });
exports.getPolicyLobByCategoryName = getPolicyLobByCategoryName;
const deletePolicyLobById = (LobId) => exports.LobModel.findOneAndDelete({ _id: LobId });
exports.deletePolicyLobById = deletePolicyLobById;
const createSinglePolicyLob = async (payload) => {
    try {
        const res = await exports.LobModel.updateOne({ _id: payload._id }, { $set: payload }, { upsert: true });
        return res;
    }
    catch (error) {
        throw new api_error_1.ApiError(500, "Something went wrong while creating the single Lob");
    }
};
exports.createSinglePolicyLob = createSinglePolicyLob;
const updateSinglePolicyLob = async (payload) => {
    try {
        const res = await exports.LobModel.updateOne({ _id: payload._id }, { $set: payload }, { upsert: true });
        return res;
    }
    catch (error) {
        throw new api_error_1.ApiError(500, "Something went wrong while updating the single Lob");
    }
};
exports.updateSinglePolicyLob = updateSinglePolicyLob;
const createMultiplePolicyLobies = async (payloads) => {
    try {
        const batchSize = 1000;
        let startIndex = 0;
        let endIndex = 1000;
        while (startIndex < payloads.length) {
            const batch = payloads.slice(startIndex, endIndex);
            // Prepare bulk operations for the current batch
            const bulkOps = batch.map(payload => ({
                updateOne: {
                    filter: { categoryName: payload.categoryName },
                    update: { $set: payload },
                    upsert: true
                }
            }));
            // Execute bulkWrite for the current batch
            await exports.LobModel.bulkWrite(bulkOps, { ordered: true });
            startIndex = startIndex + batchSize;
            endIndex = endIndex + batchSize;
        }
        return payloads.length;
    }
    catch (error) {
        throw new api_error_1.ApiError(500, "Something went wrong while creating policy lobies in batch");
    }
};
exports.createMultiplePolicyLobies = createMultiplePolicyLobies;
