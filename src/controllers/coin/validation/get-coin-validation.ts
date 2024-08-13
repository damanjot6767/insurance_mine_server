import Joi from "joi";
import { asyncHandler } from "../../../utils/async-handler";
import { ApiError } from "../../../utils/api-error";

export const getCoinByIdParamJoiValidationObject = Joi.object({
    code: Joi.string().required()
})

export const GetCoinByIdParamJoiValidation = asyncHandler(async (req, res, next) => {

    const { error, value } = getCoinByIdParamJoiValidationObject.validate(req.params);

    if (error) {
        throw new ApiError(400, error.message)
    }
    next()
})

