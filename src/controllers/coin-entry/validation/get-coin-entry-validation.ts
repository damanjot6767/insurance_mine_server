import Joi from "joi";
import { asyncHandler } from "../../../utils/async-handler";
import { ApiError } from "../../../utils/api-error";

export const getCoinEntryByIdParamJoiValidationObject = Joi.object({
    coinId: Joi.string().required()
})

export const GetCoinEntryByIdParamJoiValidation = asyncHandler(async (req, res, next) => {

    const { error, value } = getCoinEntryByIdParamJoiValidationObject.validate(req.params);

    if (error) {
        throw new ApiError(400, error.message)
    }
    next()
})

