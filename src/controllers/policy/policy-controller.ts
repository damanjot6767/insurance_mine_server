import { Worker } from "worker_threads";
import path from "path";
import { asyncHandler } from "../../utils/async-handler"
import { ApiError } from "../../utils/api-error";
import { ApiResponse } from "../../utils/api-response";
import { PolicySheetJoiValidation } from "../../common/validation/policy-sheet";
import { PolicySheetDataDto } from "../../common/dto/policy-dto";
import { generateMongooseID } from "../../utils/generate-mongo-id";
import { CreateAgentDto } from "../agent/dto";
import { createMultipleAgentsService, getAgentByAgentNameService } from "../agent/agent-service";
import { createMultiplePolicyCarriersService } from "../policy-carrier/policy-carrier-service";
import { CreatePolicyCarrierDto } from "../policy-carrier/dto";
import { CreatePolicyLobDto } from "../policy-lob/dto";
import { createMultiplePolicyLobiesService, getPolicyLobByCategoryNameService } from "../policy-lob/policy-lob-service";
import { CreateUserDto } from "../user/dto";
import { CreateUserAccountDto } from "../user-account/dto";
import { CreatePolicyDto } from "./dto";
import { createMultipleUsersService, getUserByEmailService } from "../user/user-service";
import { createMultipleUserAccountsService, getUserAccountByAccountNameService } from "../user-account/user-account-service";
import { createMultiplePoliciesService, getPoliciesAggregationForEachUserService, getPolicyByPolicyNumberService, getPolicyInfoWithAggregationByUserIdService } from "./policy-service";
import { getPolicyCarrierByCompanyName } from "../../models/policy-carrier-model";
import { removeFile } from "../../utils/fs-service";

export const getPoliciesAggregationForEachUser = asyncHandler(async (req, res) => {
    const page = req?.query?.page?+req.query.page : 0 ;
    const limit = req?.query?.limit?+req.query.limit : 10;

    const policies = await getPoliciesAggregationForEachUserService(page, limit);
    if (policies.length === 0) {
        return res.status(404).json(new ApiResponse(201, 'error', 'No policies found'));
    }

    const data = {
        limit: limit,
        page: page,
        list: policies
    }

    return res.status(200).json(new ApiResponse(200, data, "Policies get sucessfully"));

});

export const getPolicyInfoWithAggregationByUserIdSearch = asyncHandler(async (req, res) => {
    const { email } = req.query;

    const user = await getUserByEmailService(email as string);

    if (!user) {
        return res.status(404).json(new ApiResponse(201, 'error', 'User not found'));
    }

    const policies = await getPolicyInfoWithAggregationByUserIdService(user._id);
    if (policies.length === 0) {
        return res.status(404).json(new ApiResponse(201, 'error', 'No policies found for this user'));
    }

    return res.status(200).json(new ApiResponse(200, policies, "Policies get sucessfully"));

});

export const createPolicyDataThroughtSheet = asyncHandler(async (req, res) => {
    if (!req.file?.path) {
        throw new ApiError(500, 'File required');
    }

    const filePath = req.file.path;
    const fileType = path.extname(req.file.originalname).toLowerCase();

    const worker = new Worker(path.resolve(__dirname, './policy-worker'), {
        workerData: { filePath, fileType },
    });

    let responseSent = false;

    worker.on('message', async (message) => {
        if (!responseSent) {
            responseSent = true;
            await Main(message.data)
            await removeFile(filePath)
            return res.status(201).json(new ApiResponse(201, 'success', 'Data created successfully'));
        }
    });

    worker.on('error', async(error) => {
        if (!responseSent) {
            responseSent = true;
            console.error('Worker error:', error);
            await removeFile(filePath)
            return res.status(500).json(new ApiResponse(500, 'Something went wrong', 'Data creation failed'));
        }
    });

    worker.on('exit', async(code) => {
        if (code !== 0 && !responseSent) {
            responseSent = true;
            console.error(`Worker stopped with exit code ${code}`);
            await removeFile(filePath)
            return res.status(500).json(new ApiResponse(500, 'Worker stopped with an error', 'Data creation failed'));
        }
    });
});

const Main = async (payloads: PolicySheetDataDto[]) => {
    try {
        let newAgents: { [key: string]: CreateAgentDto } = {};
        let newCompanies: { [key: string]: CreatePolicyCarrierDto } = {}
        let newCategories: { [key: string]: CreatePolicyLobDto } = {}
        let newUsers: { [key: string]: CreateUserDto } = {}
        let newUserAccounts: { [key: string]: CreateUserAccountDto } = {}
        let newPolicies: { [key: string]: CreatePolicyDto } = {}

        const promises = payloads.map(async (item) => {
            //--------------------------------------------Agent Payload
            if (!newAgents[item.agent]) {
                const isAgentExist = await getAgentByAgentNameService(item.agent);
                newAgents[item.agent] = {
                    _id: isAgentExist?._id || generateMongooseID(),
                    agentName: item.agent,
                    createdAt: isAgentExist ? isAgentExist.createdAt : new Date(),
                    updatedAt: new Date(),
                };
            }

            //--------------------------------------------Company Payload
            if (!newCompanies[item.company_name]) {
                const isCompanyExist = await getPolicyCarrierByCompanyName(item.company_name);
                newCompanies[item.company_name] = {
                    _id: isCompanyExist?._id || generateMongooseID(),
                    companyName: item.company_name,
                    createdAt: isCompanyExist ? isCompanyExist.createdAt : new Date(),
                    updatedAt: new Date(),
                };
            }

            //--------------------------------------------Category Payload
            if (!newCategories[item.category_name]) {
                const isCategoryExist = await getPolicyLobByCategoryNameService(item.category_name);
                newCategories[item.category_name] = {
                    _id: isCategoryExist?._id || generateMongooseID(),
                    categoryName: item.category_name,
                    createdAt: isCategoryExist ? isCategoryExist.createdAt : new Date(),
                    updatedAt: new Date(),
                };
            }

            //--------------------------------------------User Payload
            if (!newUsers[item.email]) {
                const isUserExist = await getUserByEmailService(item.email);
                newUsers[item.email] = {
                    _id: isUserExist?._id || generateMongooseID(),
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
                const isUserAccountExist = await getUserAccountByAccountNameService(item.account_name);
                newUserAccounts[item.account_name] = {
                    _id: isUserAccountExist?._id || generateMongooseID(),
                    accountName: item.account_name,
                    userId: newUsers[item.email]._id,
                    createdAt: isUserAccountExist ? isUserAccountExist.createdAt : new Date(),
                    updatedAt: new Date(),
                };
            }

            //--------------------------------------------Policy Payload
            if (!newPolicies[item.policy_number]) {
                const isPolicyExist = await getPolicyByPolicyNumberService(item.policy_number);
                newPolicies[item.policy_number] = {
                    _id: isPolicyExist?._id || generateMongooseID(),
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
            createMultipleAgentsService(Object.values(newAgents)),
            createMultiplePolicyCarriersService(Object.values(newCompanies)),
            createMultiplePolicyLobiesService(Object.values(newCategories)),
            createMultipleUsersService(Object.values(newUsers)),
            createMultipleUserAccountsService(Object.values(newUserAccounts)),
            createMultiplePoliciesService(Object.values(newPolicies)),
        ]);

    } catch (error) {
        console.log("error->>>>>>>>>>>>>>>>>>97", error)
        throw error
    }
}