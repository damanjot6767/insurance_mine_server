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
exports.createMultipleAgents = exports.updateSingleAgent = exports.createSingleAgent = exports.deleteAgentById = exports.getAgentByAgentName = exports.getAgentById = exports.getAgents = exports.AgentModel = exports.agentSchema = void 0;
const mongoose_1 = __importStar(require("mongoose"));
const api_error_1 = require("../utils/api-error");
exports.agentSchema = new mongoose_1.Schema({
    agentName: {
        type: String,
        required: true,
        unique: true,
        index: true
    }
}, {
    timestamps: true
});
exports.AgentModel = mongoose_1.default.model('Agent', exports.agentSchema);
const getAgents = () => exports.AgentModel.find();
exports.getAgents = getAgents;
const getAgentById = (AgentId) => exports.AgentModel.findOne({ _id: AgentId });
exports.getAgentById = getAgentById;
const getAgentByAgentName = (AgentName) => exports.AgentModel.findOne({ agentName: AgentName });
exports.getAgentByAgentName = getAgentByAgentName;
const deleteAgentById = (AgentId) => exports.AgentModel.findOneAndDelete({ _id: AgentId });
exports.deleteAgentById = deleteAgentById;
const createSingleAgent = async (payload) => {
    try {
        const res = await exports.AgentModel.updateOne({ _id: payload._id }, { $set: payload }, { upsert: true });
        return res;
    }
    catch (error) {
        throw new api_error_1.ApiError(500, "Something went wrong while creating the single agent");
    }
};
exports.createSingleAgent = createSingleAgent;
const updateSingleAgent = async (payload) => {
    try {
        const res = await exports.AgentModel.updateOne({ _id: payload._id }, { $set: payload }, { upsert: true });
        return res;
    }
    catch (error) {
        throw new api_error_1.ApiError(500, "Something went wrong while updating the single agent");
    }
};
exports.updateSingleAgent = updateSingleAgent;
const createMultipleAgents = async (payloads) => {
    try {
        const batchSize = 1000;
        let startIndex = 1000;
        let endIndex = 1000;
        while (startIndex < payloads.length) {
            const batch = payloads.slice(startIndex, endIndex);
            // Prepare bulk operations for the current batch
            const bulkOps = batch.map((payload) => {
                return {
                    updateOne: {
                        filter: { agentName: payload.agentName },
                        update: { $set: payload },
                        upsert: true
                    }
                };
            });
            // Execute bulkWrite for the current batch
            await exports.AgentModel.bulkWrite(bulkOps, { ordered: true });
            startIndex = startIndex + batchSize;
            endIndex = endIndex + batchSize;
        }
        return payloads.length;
    }
    catch (error) {
        console.log("error", error);
        throw new api_error_1.ApiError(500, "Something went wrong while creating agents in batch");
    }
};
exports.createMultipleAgents = createMultipleAgents;
