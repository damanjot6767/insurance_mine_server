import * as Joi from 'joi';
import { asyncHandler } from '../../../utils/async-handler';
import { ApiError } from '../../../utils/api-error';

const createPolicyCarrierJoiValidationSchema = Joi.object({
    carrierName: Joi.string().required()
});

const CreatePolicyCarrierJoiValidation = asyncHandler(async (req, res, next) => {

    const { error, value } = createPolicyCarrierJoiValidationSchema.validate(req.body);
    
    if (error) {
        throw new ApiError(400, error.message)
    }
    next()
})

export { CreatePolicyCarrierJoiValidation, createPolicyCarrierJoiValidationSchema }