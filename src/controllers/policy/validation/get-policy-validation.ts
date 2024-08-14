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
// getPoliciesAggregationForEachUser

const getPoliciesWithPaginationJoiValidationSchema = Joi.object({
    page: Joi.number().optional().default(1).min(1),
    limit: Joi.number().optional().default(10).min(1).max(100),
});

const GetPoliciesWithPaginationJoiValidation = asyncHandler(async (req, res, next) => {

    const { error, value } = getPoliciesWithPaginationJoiValidationSchema.validate(req.query);
    
    if (error) {
        throw new ApiError(400, error.message)
    }
    next()
})



export { GetPolicyByUserEmailJoiValidation, getPolicyByUserEmailJoiValidationSchema, getPoliciesWithPaginationJoiValidationSchema, GetPoliciesWithPaginationJoiValidation }