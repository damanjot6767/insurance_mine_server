import { parentPort, workerData } from "worker_threads";
import fs from "fs";
import xlsx from "xlsx";
import { parse } from "csv-parse";
import { PolicySheetJoiValidation } from "../../common/validation/policy-sheet";
import { PolicySheetDataDto } from "../../common/dto/policy-dto";
import { generateMongooseID } from "../../utils/generate-mongo-id";
import { CreateAgentDto } from "../agent/dto";
import { createMultipleAgentsService } from "../agent/agent-service";
import { createMultiplePolicyCarriersService } from "../policy-carrier/policy-carrier-service";
import { CreatePolicyCarrierDto } from "../policy-carrier/dto";
import { CreatePolicyLobDto } from "../policy-lob/dto";
import { createMultiplePolicyLobiesService } from "../policy-lob/policy-lob-service";
import { CreateUserDto } from "../user/dto";
import { CreateUserAccountDto } from "../user-account/dto";
import { CreatePolicyDto } from "./dto";
import { createMultipleUsersService } from "../user/user-service";
import { createMultipleUserAccountsService } from "../user-account/user-account-service";
import { createMultiplePoliciesService } from "./policy-service";


const Main = async (payloads: PolicySheetDataDto[]) => {
    try {
        let newAgents: CreateAgentDto[] = [];
        let newCompanies: CreatePolicyCarrierDto[] = []
        let newCategories: CreatePolicyLobDto[] = []
        let newUsers: CreateUserDto[] = []
        let newUserAccounts: CreateUserAccountDto[] = []
        let newPolicies: CreatePolicyDto[] = []
        
        payloads.forEach((item)=>{
            //--------------------------------------------Agent Payload
            const agentPayload = {
                _id: generateMongooseID(),
                agentName:  item.agent,
                createdAt: new Date(),
                updatedAt: new Date()
            }

            //--------------------------------------------Company Payload
            const comapnyPayload = {
                _id: generateMongooseID(),
                companyName:  item.company_name,
                createdAt: new Date(),
                updatedAt: new Date()
            }

             //--------------------------------------------Category Payload
             const categoryPayload = {
                _id: generateMongooseID(),
                categoryName:  item.category_name,
                createdAt: new Date(),
                updatedAt: new Date()
            }

            //--------------------------------------------User Payload
            const userPayload = {
                _id: generateMongooseID(),
                email:  item.email,
                firstName: item.firstname,
                lastName: item.lastname,
                dob: item.dob,
                address: item.address || "",
                phoneNumber: item.phone,
                state: item.state || "",
                zipCode: item.zip || "",
                gender: item.gender,
                userType: item.userType,
                createdAt: new Date(),
                updatedAt: new Date()
            }

            //--------------------------------------------User Account Payload
            const userAccountPayload = {
                _id: generateMongooseID(),
                accountName:  item.account_name,
                userId: userPayload._id,
                createdAt: new Date(),
                updatedAt: new Date()
            }

            //--------------------------------------------Policy Payload
            const policyPayload = {
                _id: generateMongooseID(),
                policyNumber:  item.policy_number,
                policyStartDate: item.policy_start_date,
                policyEndDate: item.policy_end_date,
                policyCompanyId: comapnyPayload._id,
                policyCategoryId: categoryPayload._id,
                userId: userPayload._id,
                createdAt: new Date(),
                updatedAt: new Date()
            }


            newAgents.push(agentPayload);
            newCompanies.push(comapnyPayload);
            newCategories.push(categoryPayload);
            newUsers.push(userPayload);
            newUserAccounts.push(userAccountPayload);
            newPolicies.push(policyPayload);
        })
        

        //--------------------------------------------DB Services;
        await createMultipleAgentsService(newAgents);
        await createMultiplePolicyCarriersService(newCompanies);
        await createMultiplePolicyLobiesService(newCategories);
        await createMultipleUsersService(newUsers);
        await createMultipleUserAccountsService(newUserAccounts);
        await createMultiplePoliciesService(newPolicies);

    } catch (error) {
      console.log("error->>>>>>>>>>>>>>>>>>97", error)  
      throw error
    }
}

const processXlsx = (filePath: string) => {
    const workbook = xlsx.readFile(filePath);
    const sheetName = workbook.SheetNames[0];
    const sheet = workbook.Sheets[sheetName];
    const jsonData = xlsx.utils.sheet_to_json(sheet);

    console.log("13", jsonData)
    parentPort?.postMessage("sucess")
}

const processCsv = (filePath: string) => {
    const csvData: PolicySheetDataDto[] = [];
    const readStream = fs.createReadStream(filePath).pipe(parse({ columns: true }));

    readStream
        .on('data', (row) => {

            const { error } = PolicySheetJoiValidation(row);
            if (error) {
                readStream.destroy(new Error(error.message));
            }
            csvData.push(row);
        })
        .on('end', async() => {
            try {
                await Main(csvData);
                parentPort?.postMessage({ status: "success", message: "Data successfully imported" });
            } catch (err: any) {
                parentPort?.postMessage({ status: "error", message: err?.message });
            }
        })
        .on('error', (err) => {
                parentPort?.postMessage({ status: "error", message: err.message });
        });
};


if(workerData.fileType === ".xlsx"){
    processXlsx(workerData.filePath)
}
else if(workerData.fileType === ".csv"){
    processCsv(workerData.filePath)
}
else {
    parentPort?.postMessage("Unsupported file type")
}