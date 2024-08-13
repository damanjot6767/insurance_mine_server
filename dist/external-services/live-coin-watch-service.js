"use strict";
//this service internally call by our setInternal function server side
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
exports.getCoinDetailFromLiveCoinApi = exports.getCoinsFromLiveCoinApi = void 0;
const axios_api_call_1 = require("../utils/axios-api-call");
const liveCoinApiConfig = {
    baseUrl: process.env.LIVE_COIN_API_URL,
    apiKey: process.env.LIVE_COIN_API_SECRET
};
const getCoinsFromLiveCoinApi = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const res = yield (0, axios_api_call_1.AxiosApiCall)(axios_api_call_1.AxiosApiMethodEnum.POST, `${liveCoinApiConfig.baseUrl}/coins/list`, {
            headers: { "X-Api-Key": liveCoinApiConfig.apiKey }
        }, {
            "currency": "USD",
            "sort": "rank",
            "order": "ascending",
            "offset": 0,
            "limit": 10,
            "meta": true
        } // default body parameters
        );
        const newData = res.map((coin) => ({
            name: coin.name,
            code: coin.code,
            rank: coin.rank,
            image: coin.image,
            allTimeHighUSD: coin.allTimeHighUSD,
            rate: coin.rate,
            volume: coin.volume,
            percentageChangeInPrice: {
                hour: (coin.delta.hour - 1) * 100, // converting price change in percentage
                day: (coin.delta.day - 1) * 100,
                week: (coin.delta.hour - 1) * 100,
            }
        }));
        return newData;
    }
    catch (error) {
        throw error;
    }
});
exports.getCoinsFromLiveCoinApi = getCoinsFromLiveCoinApi;
const getCoinDetailFromLiveCoinApi = (code) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const res = yield (0, axios_api_call_1.AxiosApiCall)(axios_api_call_1.AxiosApiMethodEnum.GET, `${liveCoinApiConfig.baseUrl}/coin/${code}`, {}, {});
        return res;
    }
    catch (error) {
        throw error;
    }
});
exports.getCoinDetailFromLiveCoinApi = getCoinDetailFromLiveCoinApi;
