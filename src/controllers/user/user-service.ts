import { createMultipleUsers, createSingleUser, deleteUserById, getUserByEmail, getUserById, getUsers, updateSingleUser } from "../../models/user-model";
import { ApiError } from "../../utils/api-error";
import { CreateUserDto, UserDto } from "./dto";


export const createMultipleUsersService = async (payload: CreateUserDto[]): Promise<number> => {
    try {
        const res = await createMultipleUsers(payload);
        return res
    } catch (error) {
        throw error;
    }
}

export const createSingleUserService = async (payload: CreateUserDto): Promise<UserDto> => {
    try {
        const res = await createSingleUser(payload);
        return res
    } catch (error) {
        throw error;
    }
}

export const updateSingleUserService = async (payload: CreateUserDto): Promise<UserDto> => {
    try {
        await getUserByIdService(payload._id);

        const res = await updateSingleUser(payload);
        return res
    } catch (error) {
        throw error;
    }
}

export const getUsersService = async (): Promise<UserDto[]> => {

    const res = await getUsers()
    return res
}

export const getUserByIdService = async (userId: string): Promise<UserDto> => {

    const res = await getUserById(userId)
    if(!res) throw new ApiError(400, "not found")
    return res
}

export const getUserByEmailService = async (Email: string): Promise<UserDto | undefined> => {

    const res = await getUserByEmail(Email)
    return res
}

export const deleteUserByIdService = async (userId: string): Promise<any> => {

    const res = await deleteUserById(userId)
    if(!res) throw new ApiError(400, "not found")
    return res
}
