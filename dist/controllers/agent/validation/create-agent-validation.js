"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createAgnetJoiValidationSchema = exports.CreateAgnetJoiValidation = void 0;
const joi_1 = __importDefault(require("joi"));
const async_handler_1 = require("../../../utils/async-handler");
const api_error_1 = require("../../../utils/api-error");
const createAgnetJoiValidationSchema = joi_1.default.object({
    agentName: joi_1.default.string().required()
});
exports.createAgnetJoiValidationSchema = createAgnetJoiValidationSchema;
const CreateAgnetJoiValidation = (0, async_handler_1.asyncHandler)(async (req, res, next) => {
    const { error, value } = createAgnetJoiValidationSchema.validate(req.body);
    if (error) {
        throw new api_error_1.ApiError(400, error.message);
    }
    next();
});
exports.CreateAgnetJoiValidation = CreateAgnetJoiValidation;
