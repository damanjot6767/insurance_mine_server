"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createPolicyDataThroughtSheet = exports.getPolicyInfoWithAggregationByUserIdSearch = exports.getPoliciesAggregationForEachUser = void 0;
const worker_threads_1 = require("worker_threads");
const path_1 = __importDefault(require("path"));
const async_handler_1 = require("../../utils/async-handler");
const api_error_1 = require("../../utils/api-error");
const api_response_1 = require("../../utils/api-response");
const generate_mongo_id_1 = require("../../utils/generate-mongo-id");
const agent_service_1 = require("../agent/agent-service");
const policy_carrier_service_1 = require("../policy-carrier/policy-carrier-service");
const policy_lob_service_1 = require("../policy-lob/policy-lob-service");
const user_service_1 = require("../user/user-service");
const user_account_service_1 = require("../user-account/user-account-service");
const policy_service_1 = require("./policy-service");
const policy_carrier_model_1 = require("../../models/policy-carrier-model");
exports.getPoliciesAggregationForEachUser = (0, async_handler_1.asyncHandler)(async (req, res) => {
    const page = req?.query?.page ? +req.query.page : 0;
    const limit = req?.query?.limit ? +req.query.limit : 10;
    const policies = await (0, policy_service_1.getPoliciesAggregationForEachUserService)(page, limit);
    if (policies.length === 0) {
        return res.status(404).json(new api_response_1.ApiResponse(201, 'error', 'No policies found'));
    }
    const data = {
        limit: limit,
        page: page,
        list: policies
    };
    return res.status(200).json(new api_response_1.ApiResponse(200, data, "Policies get sucessfully"));
});
exports.getPolicyInfoWithAggregationByUserIdSearch = (0, async_handler_1.asyncHandler)(async (req, res) => {
    const { email } = req.query;
    const user = await (0, user_service_1.getUserByEmailService)(email);
    if (!user) {
        return res.status(404).json(new api_response_1.ApiResponse(201, 'error', 'User not found'));
    }
    const policies = await (0, policy_service_1.getPolicyInfoWithAggregationByUserIdService)(user._id);
    if (policies.length === 0) {
        return res.status(404).json(new api_response_1.ApiResponse(201, 'error', 'No policies found for this user'));
    }
    return res.status(200).json(new api_response_1.ApiResponse(200, policies, "Policies get sucessfully"));
});
exports.createPolicyDataThroughtSheet = (0, async_handler_1.asyncHandler)(async (req, res) => {
    if (!req.file?.path) {
        throw new api_error_1.ApiError(500, 'File required');
    }
    const filePath = req.file.path;
    const fileType = path_1.default.extname(req.file.originalname).toLowerCase();
    const worker = new worker_threads_1.Worker(path_1.default.resolve(__dirname, './policy-worker'), {
        workerData: { filePath, fileType },
    });
    let responseSent = false;
    worker.on('message', async (message) => {
        if (!responseSent) {
            responseSent = true;
            await Main(message.data);
            return res.status(201).json(new api_response_1.ApiResponse(201, 'success', 'Data created successfully'));
        }
    });
    worker.on('error', (error) => {
        if (!responseSent) {
            responseSent = true;
            console.error('Worker error:', error);
            return res.status(500).json(new api_response_1.ApiResponse(500, 'Something went wrong', 'Data creation failed'));
        }
    });
    worker.on('exit', (code) => {
        if (code !== 0 && !responseSent) {
            responseSent = true;
            console.error(`Worker stopped with exit code ${code}`);
            return res.status(500).json(new api_response_1.ApiResponse(500, 'Worker stopped with an error', 'Data creation failed'));
        }
    });
});
const Main = async (payloads) => {
    try {
        let newAgents = {};
        let newCompanies = {};
        let newCategories = {};
        let newUsers = {};
        let newUserAccounts = {};
        let newPolicies = {};
        const promises = payloads.map(async (item) => {
            //--------------------------------------------Agent Payload
            if (!newAgents[item.agent]) {
                const isAgentExist = await (0, agent_service_1.getAgentByAgentNameService)(item.agent);
                newAgents[item.agent] = {
                    _id: isAgentExist?._id || (0, generate_mongo_id_1.generateMongooseID)(),
                    agentName: item.agent,
                    createdAt: isAgentExist ? isAgentExist.createdAt : new Date(),
                    updatedAt: new Date(),
                };
            }
            //--------------------------------------------Company Payload
            if (!newCompanies[item.company_name]) {
                const isCompanyExist = await (0, policy_carrier_model_1.getPolicyCarrierByCompanyName)(item.company_name);
                newCompanies[item.company_name] = {
                    _id: isCompanyExist?._id || (0, generate_mongo_id_1.generateMongooseID)(),
                    companyName: item.company_name,
                    createdAt: isCompanyExist ? isCompanyExist.createdAt : new Date(),
                    updatedAt: new Date(),
                };
            }
            //--------------------------------------------Category Payload
            if (!newCategories[item.category_name]) {
                const isCategoryExist = await (0, policy_lob_service_1.getPolicyLobByCategoryNameService)(item.category_name);
                newCategories[item.category_name] = {
                    _id: isCategoryExist?._id || (0, generate_mongo_id_1.generateMongooseID)(),
                    categoryName: item.category_name,
                    createdAt: isCategoryExist ? isCategoryExist.createdAt : new Date(),
                    updatedAt: new Date(),
                };
            }
            //--------------------------------------------User Payload
            if (!newUsers[item.email]) {
                const isUserExist = await (0, user_service_1.getUserByEmailService)(item.email);
                newUsers[item.email] = {
                    _id: isUserExist?._id || (0, generate_mongo_id_1.generateMongooseID)(),
                    email: item.email,
                    firstName: item.firstname,
                    lastName: item.lastname,
                    dob: item.dob,
                    address: item.address || "",
                    phoneNumber: item.phone,
                    state: item.state || "",
                    zipCode: item.zip || "",
                    gender: item.gender,
                    userType: item.userType,
                    createdAt: isUserExist ? isUserExist.createdAt : new Date(),
                    updatedAt: new Date(),
                };
            }
            //--------------------------------------------User Account Payload
            if (!newUserAccounts[item.account_name]) {
                const isUserAccountExist = await (0, user_account_service_1.getUserAccountByAccountNameService)(item.account_name);
                newUserAccounts[item.account_name] = {
                    _id: isUserAccountExist?._id || (0, generate_mongo_id_1.generateMongooseID)(),
                    accountName: item.account_name,
                    userId: newUsers[item.email]._id,
                    createdAt: isUserAccountExist ? isUserAccountExist.createdAt : new Date(),
                    updatedAt: new Date(),
                };
            }
            //--------------------------------------------Policy Payload
            if (!newPolicies[item.policy_number]) {
                const isPolicyExist = await (0, policy_service_1.getPolicyByPolicyNumberService)(item.policy_number);
                newPolicies[item.policy_number] = {
                    _id: isPolicyExist?._id || (0, generate_mongo_id_1.generateMongooseID)(),
                    policyNumber: item.policy_number,
                    policyStartDate: item.policy_start_date,
                    policyEndDate: item.policy_end_date,
                    policyCompanyId: newCompanies[item.company_name]._id,
                    policyCategoryId: newCategories[item.category_name]._id,
                    userId: newUsers[item.email]._id,
                    createdAt: isPolicyExist ? isPolicyExist.createdAt : new Date(),
                    updatedAt: new Date(),
                };
            }
        });
        await Promise.all(promises);
        //--------------------------------------------DB Services
        await Promise.all([
            (0, agent_service_1.createMultipleAgentsService)(Object.values(newAgents)),
            (0, policy_carrier_service_1.createMultiplePolicyCarriersService)(Object.values(newCompanies)),
            (0, policy_lob_service_1.createMultiplePolicyLobiesService)(Object.values(newCategories)),
            (0, user_service_1.createMultipleUsersService)(Object.values(newUsers)),
            (0, user_account_service_1.createMultipleUserAccountsService)(Object.values(newUserAccounts)),
            (0, policy_service_1.createMultiplePoliciesService)(Object.values(newPolicies)),
        ]);
    }
    catch (error) {
        console.log("error->>>>>>>>>>>>>>>>>>97", error);
        throw error;
    }
};
