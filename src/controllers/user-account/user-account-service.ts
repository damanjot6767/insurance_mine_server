import { createSingleUserAccount, deleteUserAccountById, getUserAccountById, getUserAccounts } from "../../models/user-account-model";
import { ApiError } from "../../utils/api-error";
import { CreateUserAccountDto, UserAccountDto } from "./dto";


export const createSingleUserAccountService = async (payload: CreateUserAccountDto): Promise<UserAccountDto> => {
    try {
        const res = await createSingleUserAccount(payload);
        return res
    } catch (error) {
        throw error;
    }
}

export const updateSingleUserAccountService = async (payload: CreateUserAccountDto): Promise<UserAccountDto> => {
    try {
        await getUserAccountByIdService(payload._id);

        const res = await updateSingleUserAccountService(payload);
        return res
    } catch (error) {
        throw error;
    }
}

export const getUserAccountsService = async (): Promise<UserAccountDto[]> => {

    const res = await getUserAccounts()
    return res
}

export const getUserAccountByIdService = async (UserAccountId: string): Promise<UserAccountDto> => {

    const res = await getUserAccountById(UserAccountId)
    if(!res) throw new ApiError(400, "not found")
    return res
}

export const deleteUserAccountByIdService = async (UserAccountId: string): Promise<any> => {

    const res = await deleteUserAccountById(UserAccountId)
    if(!res) throw new ApiError(400, "not found")
    return res
}
