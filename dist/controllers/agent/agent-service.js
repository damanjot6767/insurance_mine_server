"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteAgentByIdService = exports.getAgentByAgentNameService = exports.getAgentByIdService = exports.getAgentsService = exports.updateSingleAgentService = exports.createSingleAgentService = exports.createMultipleAgentsService = void 0;
const agent_model_1 = require("../../models/agent-model");
const api_error_1 = require("../../utils/api-error");
const createMultipleAgentsService = async (payload) => {
    try {
        const res = await (0, agent_model_1.createMultipleAgents)(payload);
        return res;
    }
    catch (error) {
        throw error;
    }
};
exports.createMultipleAgentsService = createMultipleAgentsService;
const createSingleAgentService = async (payload) => {
    try {
        const res = await (0, agent_model_1.createSingleAgent)(payload);
        return res;
    }
    catch (error) {
        throw error;
    }
};
exports.createSingleAgentService = createSingleAgentService;
const updateSingleAgentService = async (payload) => {
    try {
        await (0, exports.getAgentByIdService)(payload._id);
        const res = await (0, exports.updateSingleAgentService)(payload);
        return res;
    }
    catch (error) {
        throw error;
    }
};
exports.updateSingleAgentService = updateSingleAgentService;
const getAgentsService = async () => {
    const res = await (0, agent_model_1.getAgents)();
    return res;
};
exports.getAgentsService = getAgentsService;
const getAgentByIdService = async (AgentId) => {
    const res = await (0, agent_model_1.getAgentById)(AgentId);
    if (!res)
        throw new api_error_1.ApiError(400, "not found");
    return res;
};
exports.getAgentByIdService = getAgentByIdService;
const getAgentByAgentNameService = async (AgentName) => {
    const res = await (0, agent_model_1.getAgentByAgentName)(AgentName);
    return res;
};
exports.getAgentByAgentNameService = getAgentByAgentNameService;
const deleteAgentByIdService = async (AgentId) => {
    const res = await (0, agent_model_1.deleteAgentById)(AgentId);
    if (!res)
        throw new api_error_1.ApiError(400, "not found");
    return res;
};
exports.deleteAgentByIdService = deleteAgentByIdService;
