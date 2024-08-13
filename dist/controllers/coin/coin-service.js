"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getCoinByCodeService = exports.getCoinsService = exports.updateMultipleCoinsService = exports.createMultipleCoinsService = void 0;
const coin_model_1 = require("../../models/coin-model");
const api_error_1 = require("../../utils/api-error");
//this service internally call by our setInternal function server side
const createMultipleCoinsService = (values) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const res = yield (0, coin_model_1.createMultipleCoins)(values);
        return res;
    }
    catch (error) {
        throw error;
    }
});
exports.createMultipleCoinsService = createMultipleCoinsService;
//this service internally call by our setInternal function server side
const updateMultipleCoinsService = (values) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const res = yield (0, coin_model_1.updateMultipleCoins)(values);
        return res;
    }
    catch (error) {
        throw error;
    }
});
exports.updateMultipleCoinsService = updateMultipleCoinsService;
const getCoinsService = () => __awaiter(void 0, void 0, void 0, function* () {
    const res = yield (0, coin_model_1.getCoins)();
    return res;
});
exports.getCoinsService = getCoinsService;
const getCoinByCodeService = (code) => __awaiter(void 0, void 0, void 0, function* () {
    const res = yield (0, coin_model_1.getCoinByCode)(code);
    if (!res)
        throw new api_error_1.ApiError(400, "not found");
    return res;
});
exports.getCoinByCodeService = getCoinByCodeService;
