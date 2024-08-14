import { createMultiplePolices, createSinglePolicy, deletePolicyById, getPoliciesAggregationForEachUser, getPolicyById, getPolicyByPolicyNumber, getPolicyInfoWithAggregationByUserId, getPolicys, updateSinglePolicy } from "../../models/policy-model";
import { ApiError } from "../../utils/api-error";
import { CreatePolicyDto, PolicyDto } from "./dto";


export const createMultiplePoliciesService = async (payload: CreatePolicyDto[]): Promise<number> => {
    try {
        const res = await createMultiplePolices(payload);
        return res
    } catch (error) {
        throw error;
    }
}

export const createSinglePolicyService = async (payload: CreatePolicyDto): Promise<PolicyDto> => {
    try {
        const res = await createSinglePolicy(payload);
        return res
    } catch (error) {
        throw error;
    }
}

export const updateSinglePolicyService = async (payload: CreatePolicyDto): Promise<PolicyDto> => {
    try {
        await getPolicyByIdService(payload._id);

        const res = await updateSinglePolicy(payload);
        return res
    } catch (error) {
        throw error;
    }
}

export const getPolicysService = async (): Promise<PolicyDto[]> => {

    const res = await getPolicys()
    return res
}

export const getPolicyByIdService = async (PolicyId: string): Promise<PolicyDto> => {

    const res = await getPolicyById(PolicyId)
    if (!res) throw new ApiError(400, "not found")
    return res
}

export const getPolicyByPolicyNumberService = async (PolicyName: string): Promise<PolicyDto | undefined> => {

    const res = await getPolicyByPolicyNumber(PolicyName)
    return res
}

export const getPolicyInfoWithAggregationByUserIdService = async (UserId: string): Promise<PolicyDto[]> => {

    const res = await getPolicyInfoWithAggregationByUserId(UserId)
    return res
}

export const getPoliciesAggregationForEachUserService = async (page: number, limit: number): Promise<PolicyDto[]> => {

    const res = await getPoliciesAggregationForEachUser(page, limit)
    return res
}

export const deletePolicyByIdService = async (PolicyId: string): Promise<any> => {

    const res = await deletePolicyById(PolicyId)
    if (!res) throw new ApiError(400, "not found")
    return res
}

