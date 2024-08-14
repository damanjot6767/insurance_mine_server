import * as Joi from 'joi';
import { asyncHandler } from '../../../utils/async-handler';
import { ApiError } from '../../../utils/api-error';
import { createAgnetJoiValidationSchema } from '../../agent/validation';
import { createPolicyCarrierJoiValidationSchema } from '../../policy-carrier/validation';
import { createPolicyLobJoiValidationSchema } from '../../policy-lob/validation';
import { createUserJoiValidationSchema } from '../../user/validation';
import { createUserAccountJoiValidationSchema } from '../../user-account/validation';

const createPolicyJoiValidationSchema = Joi.object({
    policyNumber: Joi.number().required(),
    policyStartDate: Joi.date().required(),
    policyEndDate: Joi.date().optional(),
    policyCategoryId: Joi.string().required(),
    companyCollectionId: Joi.string().required(),
    userId: Joi.string().required(),
});

const CreatePolicyJoiValidation = asyncHandler(async (req, res, next) => {

    const { error, value } = createPolicyJoiValidationSchema.validate(req.body);
    
    if (error) {
        throw new ApiError(400, error.message)
    }
    next()
})

const importPolicyDataUsingSheetValidationSchema = Joi.object({
    file: Joi.any().meta({ swaggerType: 'file' }).required().description('xlsx , csv file')
})



export { CreatePolicyJoiValidation, createPolicyJoiValidationSchema, importPolicyDataUsingSheetValidationSchema }