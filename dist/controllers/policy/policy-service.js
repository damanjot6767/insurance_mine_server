"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deletePolicyByIdService = exports.getPoliciesAggregationForEachUserService = exports.getPolicyInfoWithAggregationByUserIdService = exports.getPolicyByPolicyNumberService = exports.getPolicyByIdService = exports.getPolicysService = exports.updateSinglePolicyService = exports.createSinglePolicyService = exports.createMultiplePoliciesService = void 0;
const policy_model_1 = require("../../models/policy-model");
const api_error_1 = require("../../utils/api-error");
const createMultiplePoliciesService = async (payload) => {
    try {
        const res = await (0, policy_model_1.createMultiplePolices)(payload);
        return res;
    }
    catch (error) {
        throw error;
    }
};
exports.createMultiplePoliciesService = createMultiplePoliciesService;
const createSinglePolicyService = async (payload) => {
    try {
        const res = await (0, policy_model_1.createSinglePolicy)(payload);
        return res;
    }
    catch (error) {
        throw error;
    }
};
exports.createSinglePolicyService = createSinglePolicyService;
const updateSinglePolicyService = async (payload) => {
    try {
        await (0, exports.getPolicyByIdService)(payload._id);
        const res = await (0, policy_model_1.updateSinglePolicy)(payload);
        return res;
    }
    catch (error) {
        throw error;
    }
};
exports.updateSinglePolicyService = updateSinglePolicyService;
const getPolicysService = async () => {
    const res = await (0, policy_model_1.getPolicys)();
    return res;
};
exports.getPolicysService = getPolicysService;
const getPolicyByIdService = async (PolicyId) => {
    const res = await (0, policy_model_1.getPolicyById)(PolicyId);
    if (!res)
        throw new api_error_1.ApiError(400, "not found");
    return res;
};
exports.getPolicyByIdService = getPolicyByIdService;
const getPolicyByPolicyNumberService = async (PolicyName) => {
    const res = await (0, policy_model_1.getPolicyByPolicyNumber)(PolicyName);
    return res;
};
exports.getPolicyByPolicyNumberService = getPolicyByPolicyNumberService;
const getPolicyInfoWithAggregationByUserIdService = async (UserId) => {
    const res = await (0, policy_model_1.getPolicyInfoWithAggregationByUserId)(UserId);
    return res;
};
exports.getPolicyInfoWithAggregationByUserIdService = getPolicyInfoWithAggregationByUserIdService;
const getPoliciesAggregationForEachUserService = async (page, limit) => {
    const res = await (0, policy_model_1.getPoliciesAggregationForEachUser)(page, limit);
    return res;
};
exports.getPoliciesAggregationForEachUserService = getPoliciesAggregationForEachUserService;
const deletePolicyByIdService = async (PolicyId) => {
    const res = await (0, policy_model_1.deletePolicyById)(PolicyId);
    if (!res)
        throw new api_error_1.ApiError(400, "not found");
    return res;
};
exports.deletePolicyByIdService = deletePolicyByIdService;
