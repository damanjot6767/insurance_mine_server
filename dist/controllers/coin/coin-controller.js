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
exports.getCoinByCode = exports.getCoins = void 0;
const api_response_1 = require("../../utils/api-response");
const async_handler_1 = require("../../utils/async-handler");
const coin_service_1 = require("./coin-service");
exports.getCoins = (0, async_handler_1.asyncHandler)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const response = yield (0, coin_service_1.getCoinsService)();
    return res.
        status(200).
        json(new api_response_1.ApiResponse(201, response, 'coins get successfully'));
}));
exports.getCoinByCode = (0, async_handler_1.asyncHandler)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const response = yield (0, coin_service_1.getCoinByCodeService)(req.params.code);
    return res.
        status(200).
        json(new api_response_1.ApiResponse(201, response, 'Coin get successfully'));
}));
