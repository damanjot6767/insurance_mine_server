import Joi from 'joi';
import { asyncHandler } from '../../../utils/async-handler';
import { ApiError } from '../../../utils/api-error';

const createAgnetJoiValidationSchema = Joi.object({
    agentName: Joi.string().required()
});

const CreateAgnetJoiValidation = asyncHandler(async (req, res, next) => {

    const { error, value } = createAgnetJoiValidationSchema.validate(req.body);
    
    if (error) {
        throw new ApiError(400, error.message)
    }
    next()
})

export { CreateAgnetJoiValidation, createAgnetJoiValidationSchema }