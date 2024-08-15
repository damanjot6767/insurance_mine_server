import { CreateMessageJoiValidation, createMessageJoiValidationSchema } from "../controllers/message/validation";
import { createSingleMessageOnSheduleDate } from "../controllers/message/message-controller";

//for now all apis publically open
const routes = [
    {
		method: 'post',
		path: '/v1/message/shedule',
		joiSchemaForSwagger: {
			group: 'Message',
			description: `Route to Shedule message`,
			model: 'Message',
			body: createMessageJoiValidationSchema
		},
		middlewares: [ CreateMessageJoiValidation ],
		auth: false,
		handler: createSingleMessageOnSheduleDate
	}
]

export default routes;