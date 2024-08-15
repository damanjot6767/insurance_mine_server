"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createPolicyCarrierJoiValidationSchema = exports.CreatePolicyCarrierJoiValidation = void 0;
const joi_1 = __importDefault(require("joi"));
const async_handler_1 = require("../../../utils/async-handler");
const api_error_1 = require("../../../utils/api-error");
const createPolicyCarrierJoiValidationSchema = joi_1.default.object({
    companyName: joi_1.default.string().required()
});
exports.createPolicyCarrierJoiValidationSchema = createPolicyCarrierJoiValidationSchema;
const CreatePolicyCarrierJoiValidation = (0, async_handler_1.asyncHandler)(async (req, res, next) => {
    const { error, value } = createPolicyCarrierJoiValidationSchema.validate(req.body);
    if (error) {
        throw new api_error_1.ApiError(400, error.message);
    }
    next();
});
exports.CreatePolicyCarrierJoiValidation = CreatePolicyCarrierJoiValidation;
