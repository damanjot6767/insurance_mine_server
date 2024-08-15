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
exports.GetPoliciesWithPaginationJoiValidation = exports.getPoliciesWithPaginationJoiValidationSchema = exports.getPolicyByUserEmailJoiValidationSchema = exports.GetPolicyByUserEmailJoiValidation = void 0;
const Joi = __importStar(require("joi"));
const async_handler_1 = require("../../../utils/async-handler");
const api_error_1 = require("../../../utils/api-error");
const getPolicyByUserEmailJoiValidationSchema = Joi.object({
    email: Joi.string().email().required()
});
exports.getPolicyByUserEmailJoiValidationSchema = getPolicyByUserEmailJoiValidationSchema;
const GetPolicyByUserEmailJoiValidation = (0, async_handler_1.asyncHandler)(async (req, res, next) => {
    const { error, value } = getPolicyByUserEmailJoiValidationSchema.validate(req.query);
    if (error) {
        throw new api_error_1.ApiError(400, error.message);
    }
    next();
});
exports.GetPolicyByUserEmailJoiValidation = GetPolicyByUserEmailJoiValidation;
// getPoliciesAggregationForEachUser
const getPoliciesWithPaginationJoiValidationSchema = Joi.object({
    page: Joi.number().optional().default(1).min(1),
    limit: Joi.number().optional().default(10).min(1).max(100),
});
exports.getPoliciesWithPaginationJoiValidationSchema = getPoliciesWithPaginationJoiValidationSchema;
const GetPoliciesWithPaginationJoiValidation = (0, async_handler_1.asyncHandler)(async (req, res, next) => {
    const { error, value } = getPoliciesWithPaginationJoiValidationSchema.validate(req.query);
    if (error) {
        throw new api_error_1.ApiError(400, error.message);
    }
    next();
});
exports.GetPoliciesWithPaginationJoiValidation = GetPoliciesWithPaginationJoiValidation;
