import  Joi from 'joi';
import { asyncHandler } from '../../../utils/async-handler';
import { ApiError } from '../../../utils/api-error';
import { AvailableGenders, AvailableUserRoles } from '../../../constants';

const createUserJoiValidationSchema = Joi.object({
    email: Joi.string().email().required(),
    firstName: Joi.string().required(),
    lastName: Joi.string().optional(),
    dob: Joi.date().required(),
    address: Joi.string().required(),
    phoneNumber: Joi.string().pattern(/^\d+$/).required(),
    state: Joi.string().required(),
    zipCode: Joi.string().pattern(/^\d{5}$/).required(),
    gender: Joi.string().valid(...AvailableGenders).optional(),
    userType: Joi.string().valid(...AvailableUserRoles).required(),
});

const CreateUserJoiValidation = asyncHandler(async (req, res, next) => {

    const { error, value } = createUserJoiValidationSchema.validate(req.body);
    
    if (error) {
        throw new ApiError(400, error.message)
    }
    next()
})

export { CreateUserJoiValidation, createUserJoiValidationSchema }