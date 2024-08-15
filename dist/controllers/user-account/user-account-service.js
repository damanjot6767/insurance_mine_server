"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteUserAccountByIdService = exports.getUserAccountByAccountNameService = exports.getUserAccountByIdService = exports.getUserAccountsService = exports.updateSingleUserAccountService = exports.createSingleUserAccountService = exports.createMultipleUserAccountsService = void 0;
const user_account_model_1 = require("../../models/user-account-model");
const api_error_1 = require("../../utils/api-error");
const createMultipleUserAccountsService = async (payload) => {
    try {
        const res = await (0, user_account_model_1.createMultipleUserAccounts)(payload);
        return res;
    }
    catch (error) {
        throw error;
    }
};
exports.createMultipleUserAccountsService = createMultipleUserAccountsService;
const createSingleUserAccountService = async (payload) => {
    try {
        const res = await (0, user_account_model_1.createSingleUserAccount)(payload);
        return res;
    }
    catch (error) {
        throw error;
    }
};
exports.createSingleUserAccountService = createSingleUserAccountService;
const updateSingleUserAccountService = async (payload) => {
    try {
        await (0, exports.getUserAccountByIdService)(payload._id);
        const res = await (0, exports.updateSingleUserAccountService)(payload);
        return res;
    }
    catch (error) {
        throw error;
    }
};
exports.updateSingleUserAccountService = updateSingleUserAccountService;
const getUserAccountsService = async () => {
    const res = await (0, user_account_model_1.getUserAccounts)();
    return res;
};
exports.getUserAccountsService = getUserAccountsService;
const getUserAccountByIdService = async (UserAccountId) => {
    const res = await (0, user_account_model_1.getUserAccountById)(UserAccountId);
    if (!res)
        throw new api_error_1.ApiError(400, "not found");
    return res;
};
exports.getUserAccountByIdService = getUserAccountByIdService;
const getUserAccountByAccountNameService = async (AccountName) => {
    const res = await (0, user_account_model_1.getUserAccountByAccountName)(AccountName);
    return res;
};
exports.getUserAccountByAccountNameService = getUserAccountByAccountNameService;
const deleteUserAccountByIdService = async (UserAccountId) => {
    const res = await (0, user_account_model_1.deleteUserAccountById)(UserAccountId);
    if (!res)
        throw new api_error_1.ApiError(400, "not found");
    return res;
};
exports.deleteUserAccountByIdService = deleteUserAccountByIdService;
