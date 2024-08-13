import * as Joi from 'joi';
import { asyncHandler } from '../../../utils/async-handler';
import { ApiError } from '../../../utils/api-error';

const createCoinJoiValidationObject = Joi.object({
    _id: Joi.string().required(),
    name: Joi.string().required(),
    code: Joi.string().required(),
    rank: Joi.number().required(),
    image: Joi.object({
        png32: Joi.string().required(),
        png64: Joi.string().required(),
    }).required(),
    allTimeHighUSD: Joi.number().required(),
    rate: Joi.number().required(),
    volume: Joi.number().required(),
    percentageChangeInPrice: Joi.object({
        hour: Joi.number().required(),
        day: Joi.number().required(),
        week: Joi.number().required(),
    }).required(),
    createdAt: Joi.date().optional(),
    updatedAt: Joi.date().optional()
});

const CreateCoinJoiValidation = asyncHandler(async (req, res, next) => {

    const { error, value } = createCoinJoiValidationObject.validate(req.body);
    
    if (error) {
        throw new ApiError(400, error.message)
    }
    next()
})

export { CreateCoinJoiValidation, createCoinJoiValidationObject }