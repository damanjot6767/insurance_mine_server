import * as Joi from 'joi';
import { asyncHandler } from '../../../utils/async-handler';
import { ApiError } from '../../../utils/api-error';

const getPolicyByUserEmailJoiValidationSchema = Joi.object({
    email: Joi.string().email().required()
});

const GetPolicyByUserEmailJoiValidation = asyncHandler(async (req, res, next) => {

    const { error, value } = getPolicyByUserEmailJoiValidationSchema.validate(req.query);
    
    if (error) {
        throw new ApiError(400, error.message)
    }
    next()
})




export { GetPolicyByUserEmailJoiValidation, getPolicyByUserEmailJoiValidationSchema }