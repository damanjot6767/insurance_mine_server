"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deletePolicyLobByIdService = exports.getPolicyLobByCategoryNameService = exports.getPolicyLobByIdService = exports.getPolicyLobsService = exports.updateSinglePolicyLobService = exports.createSinglePolicyLobService = exports.createMultiplePolicyLobiesService = void 0;
const policy_lob_model_1 = require("../../models/policy-lob-model");
const api_error_1 = require("../../utils/api-error");
const createMultiplePolicyLobiesService = async (payload) => {
    try {
        const res = await (0, policy_lob_model_1.createMultiplePolicyLobies)(payload);
        return res;
    }
    catch (error) {
        throw error;
    }
};
exports.createMultiplePolicyLobiesService = createMultiplePolicyLobiesService;
const createSinglePolicyLobService = async (payload) => {
    try {
        const res = await (0, policy_lob_model_1.createSinglePolicyLob)(payload);
        return res;
    }
    catch (error) {
        throw error;
    }
};
exports.createSinglePolicyLobService = createSinglePolicyLobService;
const updateSinglePolicyLobService = async (payload) => {
    try {
        await (0, exports.getPolicyLobByIdService)(payload._id);
        const res = await (0, exports.updateSinglePolicyLobService)(payload);
        return res;
    }
    catch (error) {
        throw error;
    }
};
exports.updateSinglePolicyLobService = updateSinglePolicyLobService;
const getPolicyLobsService = async () => {
    const res = await (0, policy_lob_model_1.getPolicyLobs)();
    return res;
};
exports.getPolicyLobsService = getPolicyLobsService;
const getPolicyLobByIdService = async (PolicyLobId) => {
    const res = await (0, policy_lob_model_1.getPolicyLobById)(PolicyLobId);
    if (!res)
        throw new api_error_1.ApiError(400, "not found");
    return res;
};
exports.getPolicyLobByIdService = getPolicyLobByIdService;
const getPolicyLobByCategoryNameService = async (CategoryName) => {
    const res = await (0, policy_lob_model_1.getPolicyLobByCategoryName)(CategoryName);
    return res;
};
exports.getPolicyLobByCategoryNameService = getPolicyLobByCategoryNameService;
const deletePolicyLobByIdService = async (PolicyLobId) => {
    const res = await (0, policy_lob_model_1.deletePolicyLobById)(PolicyLobId);
    if (!res)
        throw new api_error_1.ApiError(400, "not found");
    return res;
};
exports.deletePolicyLobByIdService = deletePolicyLobByIdService;
