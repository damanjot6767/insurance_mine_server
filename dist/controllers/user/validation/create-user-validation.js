"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createUserJoiValidationSchema = exports.CreateUserJoiValidation = void 0;
const joi_1 = __importDefault(require("joi"));
const async_handler_1 = require("../../../utils/async-handler");
const api_error_1 = require("../../../utils/api-error");
const constants_1 = require("../../../constants");
const createUserJoiValidationSchema = joi_1.default.object({
    email: joi_1.default.string().email().required(),
    firstName: joi_1.default.string().required(),
    lastName: joi_1.default.string().optional(),
    dob: joi_1.default.date().required(),
    address: joi_1.default.string().required(),
    phoneNumber: joi_1.default.string().pattern(/^\d+$/).required(),
    state: joi_1.default.string().required(),
    zipCode: joi_1.default.string().pattern(/^\d{5}$/).required(),
    gender: joi_1.default.string().valid(...constants_1.AvailableGenders).optional(),
    userType: joi_1.default.string().valid(...constants_1.AvailableUserRoles).required(),
});
exports.createUserJoiValidationSchema = createUserJoiValidationSchema;
const CreateUserJoiValidation = (0, async_handler_1.asyncHandler)(async (req, res, next) => {
    const { error, value } = createUserJoiValidationSchema.validate(req.body);
    if (error) {
        throw new api_error_1.ApiError(400, error.message);
    }
    next();
});
exports.CreateUserJoiValidation = CreateUserJoiValidation;
