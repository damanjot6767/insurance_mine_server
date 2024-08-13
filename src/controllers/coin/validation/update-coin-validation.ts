import * as Joi from 'joi';
import { asyncHandler } from '../../../utils/async-handler';
import { ApiError } from '../../../utils/api-error';

const updateCoinJoiValidationObject = Joi.object({
    allTimeHighUSD: Joi.number().required(),
    rate: Joi.number().required(),
    volume: Joi.number().required(),
    percentageChangeInPrice: Joi.object({
        hour: Joi.number().required(),
        day: Joi.number().required(),
        week: Joi.number().required(),
    }).required(),
})

const UpdateUserJoiValidation = asyncHandler(async (req, res, next) => {

    const { error, value } = updateCoinJoiValidationObject.validate(req.body);

    if (error) {
        throw new ApiError(400, error.message)
    }
    next()
})

export { UpdateUserJoiValidation, updateCoinJoiValidationObject }