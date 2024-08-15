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
exports.importPolicyDataUsingSheetValidationSchema = exports.createPolicyJoiValidationSchema = exports.CreatePolicyJoiValidation = void 0;
const Joi = __importStar(require("joi"));
const async_handler_1 = require("../../../utils/async-handler");
const api_error_1 = require("../../../utils/api-error");
const createPolicyJoiValidationSchema = Joi.object({
    policyNumber: Joi.number().required(),
    policyStartDate: Joi.date().required(),
    policyEndDate: Joi.date().optional(),
    policyCategoryId: Joi.string().required(),
    companyCollectionId: Joi.string().required(),
    userId: Joi.string().required(),
});
exports.createPolicyJoiValidationSchema = createPolicyJoiValidationSchema;
const CreatePolicyJoiValidation = (0, async_handler_1.asyncHandler)(async (req, res, next) => {
    const { error, value } = createPolicyJoiValidationSchema.validate(req.body);
    if (error) {
        throw new api_error_1.ApiError(400, error.message);
    }
    next();
});
exports.CreatePolicyJoiValidation = CreatePolicyJoiValidation;
const importPolicyDataUsingSheetValidationSchema = Joi.object({
    file: Joi.any().meta({ swaggerType: 'file' }).required().description('xlsx , csv file')
});
exports.importPolicyDataUsingSheetValidationSchema = importPolicyDataUsingSheetValidationSchema;
