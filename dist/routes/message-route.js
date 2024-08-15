"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const validation_1 = require("../controllers/message/validation");
const message_controller_1 = require("../controllers/message/message-controller");
//for now all apis publically open
const routes = [
    {
        method: 'post',
        path: '/v1/message/shedule',
        joiSchemaForSwagger: {
            group: 'Message',
            description: `Route to Shedule message`,
            model: 'Message',
            body: validation_1.createMessageJoiValidationSchema
        },
        middlewares: [validation_1.CreateMessageJoiValidation],
        auth: false,
        handler: message_controller_1.createSingleMessageOnSheduleDate
    }
];
exports.default = routes;
