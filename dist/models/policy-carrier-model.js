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
exports.createMultiplePolicyCarriers = exports.updateSinglePolicyCarrier = exports.createSinglePolicyCarrier = exports.deletePolicyCarrierById = exports.getPolicyCarrierByCompanyName = exports.getPolicyCarrierById = exports.getPolicyCarriers = exports.CarrierModel = exports.carrierSchema = void 0;
const mongoose_1 = __importStar(require("mongoose"));
const api_error_1 = require("../utils/api-error");
exports.carrierSchema = new mongoose_1.Schema({
    companyName: {
        type: String,
        required: true,
        unique: true,
        index: true
    }
}, {
    timestamps: true
});
exports.CarrierModel = mongoose_1.default.model('Carrier', exports.carrierSchema);
const getPolicyCarriers = () => exports.CarrierModel.find();
exports.getPolicyCarriers = getPolicyCarriers;
const getPolicyCarrierById = (CarrierId) => exports.CarrierModel.findOne({ _id: CarrierId });
exports.getPolicyCarrierById = getPolicyCarrierById;
const getPolicyCarrierByCompanyName = (CompanyName) => exports.CarrierModel.findOne({ companyName: CompanyName });
exports.getPolicyCarrierByCompanyName = getPolicyCarrierByCompanyName;
const deletePolicyCarrierById = (CarrierId) => exports.CarrierModel.findOneAndDelete({ _id: CarrierId });
exports.deletePolicyCarrierById = deletePolicyCarrierById;
const createSinglePolicyCarrier = async (payload) => {
    try {
        const res = await exports.CarrierModel.updateOne({ _id: payload._id }, { $set: payload }, { upsert: true });
        return res;
    }
    catch (error) {
        throw new api_error_1.ApiError(500, "Something went wrong while creating the single Carrier");
    }
};
exports.createSinglePolicyCarrier = createSinglePolicyCarrier;
const updateSinglePolicyCarrier = async (payload) => {
    try {
        const res = await exports.CarrierModel.updateOne({ _id: payload._id }, { $set: payload }, { upsert: true });
        return res;
    }
    catch (error) {
        throw new api_error_1.ApiError(500, "Something went wrong while updating the single Carrier");
    }
};
exports.updateSinglePolicyCarrier = updateSinglePolicyCarrier;
const createMultiplePolicyCarriers = async (payloads) => {
    try {
        const batchSize = 1000;
        let startIndex = 0;
        let endIndex = 1000;
        while (startIndex < payloads.length) {
            const batch = payloads.slice(startIndex, endIndex);
            // Prepare bulk operations for the current batch
            const bulkOps = batch.map(payload => ({
                updateOne: {
                    filter: { companyName: payload.companyName },
                    update: { $set: payload },
                    upsert: true
                }
            }));
            // Execute bulkWrite for the current batch
            const batchResult = await exports.CarrierModel.bulkWrite(bulkOps, { ordered: true });
            startIndex = startIndex + batchSize;
            endIndex = endIndex + batchSize;
        }
        return payloads.length;
    }
    catch (error) {
        console.log("error", error);
        throw new api_error_1.ApiError(500, "Something went wrong while creating policy carriers in batch");
    }
};
exports.createMultiplePolicyCarriers = createMultiplePolicyCarriers;
