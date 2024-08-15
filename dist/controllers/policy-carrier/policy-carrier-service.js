"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deletePolicyCarrierByIdService = exports.getPolicyCarrierByCompanyNameService = exports.getPolicyCarrierByIdService = exports.getPolicyCarriersService = exports.updateSinglePolicyCarrierService = exports.createSinglePolicyCarrierService = exports.createMultiplePolicyCarriersService = void 0;
const policy_carrier_model_1 = require("../../models/policy-carrier-model");
const api_error_1 = require("../../utils/api-error");
const createMultiplePolicyCarriersService = async (payload) => {
    try {
        const res = await (0, policy_carrier_model_1.createMultiplePolicyCarriers)(payload);
        return res;
    }
    catch (error) {
        throw error;
    }
};
exports.createMultiplePolicyCarriersService = createMultiplePolicyCarriersService;
const createSinglePolicyCarrierService = async (payload) => {
    try {
        const res = await (0, policy_carrier_model_1.createSinglePolicyCarrier)(payload);
        return res;
    }
    catch (error) {
        throw error;
    }
};
exports.createSinglePolicyCarrierService = createSinglePolicyCarrierService;
const updateSinglePolicyCarrierService = async (payload) => {
    try {
        await (0, exports.getPolicyCarrierByIdService)(payload._id);
        const res = await (0, exports.updateSinglePolicyCarrierService)(payload);
        return res;
    }
    catch (error) {
        throw error;
    }
};
exports.updateSinglePolicyCarrierService = updateSinglePolicyCarrierService;
const getPolicyCarriersService = async () => {
    const res = await (0, policy_carrier_model_1.getPolicyCarriers)();
    return res;
};
exports.getPolicyCarriersService = getPolicyCarriersService;
const getPolicyCarrierByIdService = async (PolicyCarrierId) => {
    const res = await (0, policy_carrier_model_1.getPolicyCarrierById)(PolicyCarrierId);
    if (!res)
        throw new api_error_1.ApiError(400, "not found");
    return res;
};
exports.getPolicyCarrierByIdService = getPolicyCarrierByIdService;
const getPolicyCarrierByCompanyNameService = async (CompanyName) => {
    const res = await (0, policy_carrier_model_1.getPolicyCarrierByCompanyName)(CompanyName);
    return res;
};
exports.getPolicyCarrierByCompanyNameService = getPolicyCarrierByCompanyNameService;
const deletePolicyCarrierByIdService = async (PolicyCarrierId) => {
    const res = await (0, policy_carrier_model_1.deletePolicyCarrierById)(PolicyCarrierId);
    if (!res)
        throw new api_error_1.ApiError(400, "not found");
    return res;
};
exports.deletePolicyCarrierByIdService = deletePolicyCarrierByIdService;
