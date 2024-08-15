"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const policy_controller_1 = require("../controllers/policy/policy-controller");
const validation_1 = require("../controllers/policy/validation");
const multer_1 = require("../utils/multer");
//for now all apis publically open
const routes = [
    {
        method: 'post',
        path: '/v1/policy/import',
        joiSchemaForSwagger: {
            group: 'Policy',
            description: `Route to import policy data using sheet`,
            model: 'Policy',
            formData: validation_1.importPolicyDataUsingSheetValidationSchema,
        },
        middlewares: [multer_1.multerUpload.single('file')],
        auth: false,
        handler: policy_controller_1.createPolicyDataThroughtSheet
    },
    {
        method: 'get',
        path: '/v1/policy/search',
        joiSchemaForSwagger: {
            group: 'Policy',
            description: `Route to get policy info by user email`,
            model: 'Policy',
            query: validation_1.getPolicyByUserEmailJoiValidationSchema,
        },
        middlewares: [validation_1.GetPolicyByUserEmailJoiValidation],
        auth: false,
        handler: policy_controller_1.getPolicyInfoWithAggregationByUserIdSearch
    },
    {
        method: 'get',
        path: '/v1/policy/aggregate',
        joiSchemaForSwagger: {
            group: 'Policy',
            description: `Route to get aggregated policy for each user`,
            model: 'Policy',
            query: validation_1.getPoliciesWithPaginationJoiValidationSchema
        },
        middlewares: [validation_1.GetPoliciesWithPaginationJoiValidation],
        auth: false,
        handler: policy_controller_1.getPoliciesAggregationForEachUser
    }
];
exports.default = routes;
