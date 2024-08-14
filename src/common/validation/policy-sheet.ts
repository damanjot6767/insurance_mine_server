import Joi from 'joi';
import { AvailableGenders, AvailableUserRoles } from '../../constants';

// Define your available genders and user roles

const policySheetValidationSchema = Joi.object({
    //---------------------------------------------------Policy
    policy_number1: Joi.string().required(),
    policy_start_date: Joi.date().required(),
    policy_end_date: Joi.date().optional(), // Corrected typo

    //---------------------------------------------------Agent
    agent: Joi.string().required(),

    //---------------------------------------------------Policy Carrier
    company_name: Joi.string().required(),

    //---------------------------------------------------Policy Lob
    category_name: Joi.string().required(),

    //---------------------------------------------------User
    email: Joi.string().email().required(),
    firstname: Joi.string().required(),
    lastname: Joi.string().optional(),
    dob: Joi.date().required(),
    address: Joi.string().optional().allow(''),
    phone: Joi.string().required(),
    state: Joi.string().optional().allow(''),
    zip: Joi.string().optional().allow(''),
    gender: Joi.string().valid(...AvailableGenders).optional().allow(''), // Adjusted for valid values
    userType: Joi.string().valid(...AvailableUserRoles).required(),

    //---------------------------------------------------User Account
    account_name: Joi.string().required(),
}).unknown();;

// Validation function
const PolicySheetJoiValidation = (payload: any) => {
    const { error, value } = policySheetValidationSchema.validate(payload);
    return { error, value };
};

export { PolicySheetJoiValidation };
