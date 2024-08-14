import { createPolicyDataThroughtSheet } from "../controllers/policy/policy-controller";
import { importPolicyDataUsingSheetValidationSchema } from "../controllers/policy/validation";
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
	}
]

export default routes;