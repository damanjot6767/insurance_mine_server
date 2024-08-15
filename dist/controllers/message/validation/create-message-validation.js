"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createMessageJoiValidationSchema = exports.CreateMessageJoiValidation = void 0;
const joi_1 = __importDefault(require("joi"));
const async_handler_1 = require("../../../utils/async-handler");
const api_error_1 = require("../../../utils/api-error");
const datePattern = /^\d{4}-\d{2}-\d{2}$/;
const timePattern = /^\d{2}:\d{2}:\d{2}$/;
const createMessageJoiValidationSchema = joi_1.default.object({
    message: joi_1.default.string().required(),
    day: joi_1.default.string().pattern(datePattern).required().messages({
        'string.pattern.base': 'Day must be in the format DD-MM-YY'
    }),
    time: joi_1.default.string().pattern(timePattern).required().messages({
        'string.pattern.base': 'Time must be in the format HH:MM'
    }),
});
exports.createMessageJoiValidationSchema = createMessageJoiValidationSchema;
const CreateMessageJoiValidation = (0, async_handler_1.asyncHandler)(async (req, res, next) => {
    const { error, value } = createMessageJoiValidationSchema.validate(req.body);
    if (error) {
        throw new api_error_1.ApiError(400, error.message);
    }
    next();
});
exports.CreateMessageJoiValidation = CreateMessageJoiValidation;
