import * as Joi from 'joi';
import { asyncHandler } from '../../../utils/async-handler';
import { ApiError } from '../../../utils/api-error';
import { AvailableGenders, AvailableUserRoles } from '../../../constants';

const createUserAccountJoiValidationSchema = Joi.object({
    accountName: Joi.string().required()
});

const CreateUserAccountJoiValidation = asyncHandler(async (req, res, next) => {

    const { error, value } = createUserAccountJoiValidationSchema.validate(req.body);
    
    if (error) {
        throw new ApiError(400, error.message)
    }
    next()
})

export { CreateUserAccountJoiValidation, createUserAccountJoiValidationSchema }