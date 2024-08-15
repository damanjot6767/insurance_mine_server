import Joi from 'joi';
import { asyncHandler } from '../../../utils/async-handler';
import { ApiError } from '../../../utils/api-error';

const datePattern = /^\d{4}-\d{2}-\d{2}$/;
const timePattern = /^\d{2}:\d{2}:\d{2}$/;

const createMessageJoiValidationSchema = Joi.object({
    message: Joi.string().required(),
    day: Joi.string().pattern(datePattern).required().messages({
        'string.pattern.base': 'Day must be in the format DD-MM-YY'
    }),
    time: Joi.string().pattern(timePattern).required().messages({
        'string.pattern.base': 'Time must be in the format HH:MM'
    }),
});

const CreateMessageJoiValidation = asyncHandler(async (req, res, next) => {

    const { error, value } = createMessageJoiValidationSchema.validate(req.body);
    
    if (error) {
        throw new ApiError(400, error.message)
    }
    next()
})

export { CreateMessageJoiValidation, createMessageJoiValidationSchema }