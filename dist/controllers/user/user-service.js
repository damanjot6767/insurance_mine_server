"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteUserByIdService = exports.getUserByEmailService = exports.getUserByIdService = exports.getUsersService = exports.updateSingleUserService = exports.createSingleUserService = exports.createMultipleUsersService = void 0;
const user_model_1 = require("../../models/user-model");
const api_error_1 = require("../../utils/api-error");
const createMultipleUsersService = async (payload) => {
    try {
        const res = await (0, user_model_1.createMultipleUsers)(payload);
        return res;
    }
    catch (error) {
        throw error;
    }
};
exports.createMultipleUsersService = createMultipleUsersService;
const createSingleUserService = async (payload) => {
    try {
        const res = await (0, user_model_1.createSingleUser)(payload);
        return res;
    }
    catch (error) {
        throw error;
    }
};
exports.createSingleUserService = createSingleUserService;
const updateSingleUserService = async (payload) => {
    try {
        await (0, exports.getUserByIdService)(payload._id);
        const res = await (0, user_model_1.updateSingleUser)(payload);
        return res;
    }
    catch (error) {
        throw error;
    }
};
exports.updateSingleUserService = updateSingleUserService;
const getUsersService = async () => {
    const res = await (0, user_model_1.getUsers)();
    return res;
};
exports.getUsersService = getUsersService;
const getUserByIdService = async (userId) => {
    const res = await (0, user_model_1.getUserById)(userId);
    if (!res)
        throw new api_error_1.ApiError(400, "not found");
    return res;
};
exports.getUserByIdService = getUserByIdService;
const getUserByEmailService = async (Email) => {
    const res = await (0, user_model_1.getUserByEmail)(Email);
    return res;
};
exports.getUserByEmailService = getUserByEmailService;
const deleteUserByIdService = async (userId) => {
    const res = await (0, user_model_1.deleteUserById)(userId);
    if (!res)
        throw new api_error_1.ApiError(400, "not found");
    return res;
};
exports.deleteUserByIdService = deleteUserByIdService;
