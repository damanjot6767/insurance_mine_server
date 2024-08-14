import { createSinglePolicyCarrier, deletePolicyCarrierById, getPolicyCarrierById, getPolicyCarriers } from "../../models/policy-carrier-model";
import { ApiError } from "../../utils/api-error";
import { CreatePolicyCarrierDto, PolicyCarrierDto } from "./dto";


export const createSinglePolicyCarrierService = async (payload: CreatePolicyCarrierDto): Promise<PolicyCarrierDto> => {
    try {
        const res = await createSinglePolicyCarrier(payload);
        return res
    } catch (error) {
        throw error;
    }
}

export const updateSinglePolicyCarrierService = async (payload: CreatePolicyCarrierDto): Promise<PolicyCarrierDto> => {
    try {
        await getPolicyCarrierByIdService(payload._id);

        const res = await updateSinglePolicyCarrierService(payload);
        return res
    } catch (error) {
        throw error;
    }
}

export const getPolicyCarriersService = async (): Promise<PolicyCarrierDto[]> => {

    const res = await getPolicyCarriers()
    return res
}

export const getPolicyCarrierByIdService = async (PolicyCarrierId: string): Promise<PolicyCarrierDto> => {

    const res = await getPolicyCarrierById(PolicyCarrierId)
    if(!res) throw new ApiError(400, "not found")
    return res
}

export const deletePolicyCarrierByIdService = async (PolicyCarrierId: string): Promise<any> => {

    const res = await deletePolicyCarrierById(PolicyCarrierId)
    if(!res) throw new ApiError(400, "not found")
    return res
}
