import * as Joi from 'joi';
import { asyncHandler } from '../../../utils/async-handler';
import { ApiError } from '../../../utils/api-error';

const createPolicyLobJoiValidationSchema = Joi.object({
    categoryName: Joi.string().required()
});

const CreatePolicyLobJoiValidation = asyncHandler(async (req, res, next) => {

    const { error, value } = createPolicyLobJoiValidationSchema.validate(req.body);
    
    if (error) {
        throw new ApiError(400, error.message)
    }
    next()
})

export { CreatePolicyLobJoiValidation, createPolicyLobJoiValidationSchema }