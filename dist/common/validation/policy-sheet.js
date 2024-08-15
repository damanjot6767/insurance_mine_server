"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PolicySheetJoiValidation = void 0;
const joi_1 = __importDefault(require("joi"));
const constants_1 = require("../../constants");
// Define your available genders and user roles
const policySheetValidationSchema = joi_1.default.object({
    //---------------------------------------------------Policy
    policy_number: joi_1.default.string().required(),
    policy_start_date: joi_1.default.date().required(),
    policy_end_date: joi_1.default.date().optional(), // Corrected typo
    //---------------------------------------------------Agent
    agent: joi_1.default.string().required(),
    //---------------------------------------------------Policy Carrier
    company_name: joi_1.default.string().required(),
    //---------------------------------------------------Policy Lob
    category_name: joi_1.default.string().required(),
    //---------------------------------------------------User
    email: joi_1.default.string().email().required(),
    firstname: joi_1.default.string().required(),
    lastname: joi_1.default.string().optional(),
    dob: joi_1.default.date().required(),
    address: joi_1.default.string().optional().allow(''),
    phone: joi_1.default.string().required(),
    state: joi_1.default.string().optional().allow(''),
    zip: joi_1.default.string().optional().allow(''),
    gender: joi_1.default.string().valid(...constants_1.AvailableGenders).optional().allow(''), // Adjusted for valid values
    userType: joi_1.default.string().valid(...constants_1.AvailableUserRoles).required(),
    //---------------------------------------------------User Account
    account_name: joi_1.default.string().required(),
}).unknown();
;
// Validation function
const PolicySheetJoiValidation = (payload) => {
    const { error, value } = policySheetValidationSchema.validate(payload);
    return { error, value };
};
exports.PolicySheetJoiValidation = PolicySheetJoiValidation;
