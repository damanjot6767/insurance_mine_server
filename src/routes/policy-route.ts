import { query } from "express";
import { createPolicyDataThroughtSheet, getPoliciesAggregationForEachUser, getPolicyInfoWithAggregationByUserIdSearch } from "../controllers/policy/policy-controller";
import { GetPoliciesWithPaginationJoiValidation, GetPolicyByUserEmailJoiValidation, getPoliciesWithPaginationJoiValidationSchema, getPolicyByUserEmailJoiValidationSchema, importPolicyDataUsingSheetValidationSchema } from "../controllers/policy/validation";
import { multerUpload } from "../utils/multer";

//for now all apis publically open
const routes = [
    {
		method: 'post',
		path: '/v1/policy/import',
		joiSchemaForSwagger: {
			group: 'Policy',
			description: `Route to import policy data using sheet`,
			model: 'Policy',
			formData: importPolicyDataUsingSheetValidationSchema,
		},
		middlewares: [ multerUpload.single('file') ],
		auth: false,
		handler: createPolicyDataThroughtSheet
	},
	{
		method: 'get',
		path: '/v1/policy/search',
		joiSchemaForSwagger: {
			group: 'Policy',
			description: `Route to get policy info by user email`,
			model: 'Policy',
			query: getPolicyByUserEmailJoiValidationSchema,
		},
		middlewares: [GetPolicyByUserEmailJoiValidation ],
		auth: false,
		handler: getPolicyInfoWithAggregationByUserIdSearch
	},
	{
		method: 'get',
		path: '/v1/policy/aggregate',
		joiSchemaForSwagger: {
			group: 'Policy',
			description: `Route to get aggregated policy for each user`,
			model: 'Policy',
			query: getPoliciesWithPaginationJoiValidationSchema
		},
		middlewares: [ GetPoliciesWithPaginationJoiValidation ],
		auth: false,
		handler: getPoliciesAggregationForEachUser
	}
]

export default routes;