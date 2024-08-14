import { createMultiplePolicyLobies, createSinglePolicyLob, deletePolicyLobById, getPolicyLobById, getPolicyLobs } from "../../models/policy-lob-model";
import { ApiError } from "../../utils/api-error";
import { CreatePolicyLobDto, PolicyLobDto } from "./dto";


export const createMultiplePolicyLobiesService = async (payload: CreatePolicyLobDto[]): Promise<number> => {
    try {
        const res = await createMultiplePolicyLobies(payload);
        return res
    } catch (error) {
        throw error;
    }
}

export const createSinglePolicyLobService = async (payload: CreatePolicyLobDto): Promise<PolicyLobDto> => {
    try {
        const res = await createSinglePolicyLob(payload);
        return res
    } catch (error) {
        throw error;
    }
}

export const updateSinglePolicyLobService = async (payload: CreatePolicyLobDto): Promise<PolicyLobDto> => {
    try {
        await getPolicyLobByIdService(payload._id);

        const res = await updateSinglePolicyLobService(payload);
        return res
    } catch (error) {
        throw error;
    }
}

export const getPolicyLobsService = async (): Promise<PolicyLobDto[]> => {

    const res = await getPolicyLobs()
    return res
}

export const getPolicyLobByIdService = async (PolicyLobId: string): Promise<PolicyLobDto> => {

    const res = await getPolicyLobById(PolicyLobId)
    if(!res) throw new ApiError(400, "not found")
    return res
}

export const deletePolicyLobByIdService = async (PolicyLobId: string): Promise<any> => {

    const res = await deletePolicyLobById(PolicyLobId)
    if(!res) throw new ApiError(400, "not found")
    return res
}
