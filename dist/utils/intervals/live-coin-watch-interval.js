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
exports.stopLiveCoinWatchIntervals = exports.liveCoinWatchIntervals = void 0;
const coin_entry_service_1 = require("../../controllers/coin-entry/coin-entry-service");
const coin_service_1 = require("../../controllers/coin/coin-service");
const live_coin_watch_service_1 = require("../../external-services/live-coin-watch-service");
let intervalId;
let intervalTime = process.env.LIVE_COIN_API_CALL_INTERVAL_TIME ? +process.env.LIVE_COIN_API_CALL_INTERVAL_TIME : 60000;
const liveCoinWatchIntervals = () => __awaiter(void 0, void 0, void 0, function* () {
    setInterval(() => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const coins = yield (0, live_coin_watch_service_1.getCoinsFromLiveCoinApi)();
            yield (0, coin_service_1.createMultipleCoinsService)(coins);
            const coinEntries = yield coins.map((coin) => ({
                coinId: coin.code,
                rate: coin.rate,
                volume: coin.volume,
                percentageChangeInPrice: coin.percentageChangeInPrice
            }));
            yield (0, coin_entry_service_1.createMultipleCoinEntriesService)(coinEntries);
        }
        catch (error) {
            console.error("Error in liveCoinWatchIntervals:", error);
        }
    }), intervalTime);
});
exports.liveCoinWatchIntervals = liveCoinWatchIntervals;
const stopLiveCoinWatchIntervals = () => {
    if (intervalId) {
        clearInterval(intervalId);
        console.log("Stopped live coin watch intervals.");
    }
};
exports.stopLiveCoinWatchIntervals = stopLiveCoinWatchIntervals;
