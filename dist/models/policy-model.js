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
exports.getPoliciesAggregationForEachUser = exports.getPolicyInfoWithAggregationByUserId = exports.createMultiplePolices = exports.updateSinglePolicy = exports.createSinglePolicy = exports.deletePolicyById = exports.getPolicyByPolicyNumber = exports.getPolicyById = exports.getPolicys = exports.PolicyModel = exports.policySchema = void 0;
const mongoose_1 = __importStar(require("mongoose"));
const api_error_1 = require("../utils/api-error");
exports.policySchema = new mongoose_1.Schema({
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
        type: mongoose_1.default.Schema.Types.ObjectId,
        ref: 'LOB'
    },
    policyCompanyId: {
        type: mongoose_1.default.Schema.Types.ObjectId,
        ref: 'Carrier'
    },
    userId: {
        type: mongoose_1.default.Schema.Types.ObjectId,
        ref: 'User'
    },
}, {
    timestamps: true
});
exports.PolicyModel = mongoose_1.default.model('Policy', exports.policySchema);
const getPolicys = () => exports.PolicyModel.find();
exports.getPolicys = getPolicys;
const getPolicyById = (PolicyId) => exports.PolicyModel.findOne({ _id: PolicyId });
exports.getPolicyById = getPolicyById;
const getPolicyByPolicyNumber = (PolicyNumber) => exports.PolicyModel.findOne({ policyNumber: PolicyNumber });
exports.getPolicyByPolicyNumber = getPolicyByPolicyNumber;
const deletePolicyById = (PolicyId) => exports.PolicyModel.findOneAndDelete({ _id: PolicyId });
exports.deletePolicyById = deletePolicyById;
const createSinglePolicy = async (payload) => {
    try {
        const res = await exports.PolicyModel.updateOne({ _id: payload._id }, { $set: payload }, { upsert: true });
        return res;
    }
    catch (error) {
        throw new api_error_1.ApiError(500, "Something went wrong while creating the single Policy");
    }
};
exports.createSinglePolicy = createSinglePolicy;
const updateSinglePolicy = async (payload) => {
    try {
        const res = await exports.PolicyModel.updateOne({ _id: payload._id }, { $set: payload }, { upsert: true });
        return res;
    }
    catch (error) {
        throw new api_error_1.ApiError(500, "Something went wrong while updating the single Policy");
    }
};
exports.updateSinglePolicy = updateSinglePolicy;
const createMultiplePolices = async (payloads) => {
    try {
        const batchSize = 1000;
        let startIndex = 0;
        let endIndex = 1000;
        while (startIndex < payloads.length) {
            const batch = payloads.slice(startIndex, endIndex);
            // Prepare bulk operations for the current batch
            const bulkOps = batch.map(payload => ({
                updateOne: {
                    filter: { policyNumber: payload.policyNumber },
                    update: { $set: payload },
                    upsert: true
                }
            }));
            // Execute bulkWrite for the current batch
            await exports.PolicyModel.bulkWrite(bulkOps, { ordered: true });
            startIndex = startIndex + batchSize;
            endIndex = endIndex + batchSize;
        }
        return payloads.length;
    }
    catch (error) {
        throw new api_error_1.ApiError(500, "Something went wrong while creating policies in batch");
    }
};
exports.createMultiplePolices = createMultiplePolices;
const getPolicyInfoWithAggregationByUserId = async (userId) => {
    try {
        const policies = await exports.PolicyModel.find({ userId: userId })
            .populate('policyCategoryId')
            .populate('policyCompanyId')
            .populate('userId')
            .exec();
        return policies;
    }
    catch (error) {
        throw new api_error_1.ApiError(500, "Something went wrong while find policy info by userId");
    }
};
exports.getPolicyInfoWithAggregationByUserId = getPolicyInfoWithAggregationByUserId;
const getPoliciesAggregationForEachUser = async (page, limit) => {
    try {
        const aggregatedPolicies = await exports.PolicyModel.aggregate([
            {
                $lookup: {
                    from: 'users',
                    localField: 'userId',
                    foreignField: '_id',
                    as: 'userInfo'
                }
            },
            {
                $unwind: '$userInfo'
            },
            {
                $group: {
                    _id: '$userId',
                    userInfo: { $first: '$userInfo' },
                    policies: {
                        $push: {
                            policyNumber: '$policyNumber',
                            policyStartDate: '$policyStartDate',
                            policyEndDate: '$policyEndDate',
                            policyCategoryId: '$policyCategoryId',
                            policyCompanyId: '$policyCompanyId',
                            createdAt: '$createdAt',
                            updatedAt: '$updatedAt'
                        }
                    }
                }
            },
            {
                $skip: (page - 1) * limit
            },
            {
                $limit: limit
            }
        ]);
        return aggregatedPolicies;
    }
    catch (error) {
        throw new api_error_1.ApiError(500, "Something went wrong while find policies info for each user");
    }
};
exports.getPoliciesAggregationForEachUser = getPoliciesAggregationForEachUser;
