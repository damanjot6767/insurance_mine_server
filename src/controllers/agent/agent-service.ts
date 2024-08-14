import { createSingleAgent, deleteAgentById, getAgentById, getAgents } from "../../models/agent-model";
import { ApiError } from "../../utils/api-error";
import { CreateAgentDto, AgentDto } from "./dto";


export const createSingleAgentService = async (payload: CreateAgentDto): Promise<AgentDto> => {
    try {
        const res = await createSingleAgent(payload);
        return res
    } catch (error) {
        throw error;
    }
}

export const updateSingleAgentService = async (payload: CreateAgentDto): Promise<AgentDto> => {
    try {
        await getAgentByIdService(payload._id);

        const res = await updateSingleAgentService(payload);
        return res
    } catch (error) {
        throw error;
    }
}

export const getAgentsService = async (): Promise<AgentDto[]> => {

    const res = await getAgents()
    return res
}

export const getAgentByIdService = async (AgentId: string): Promise<AgentDto> => {

    const res = await getAgentById(AgentId)
    if(!res) throw new ApiError(400, "not found")
    return res
}

export const deleteAgentByIdService = async (AgentId: string): Promise<any> => {

    const res = await deleteAgentById(AgentId)
    if(!res) throw new ApiError(400, "not found")
    return res
}
