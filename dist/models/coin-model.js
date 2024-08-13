"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
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
exports.updateMultipleCoins = exports.createMultipleCoins = exports.deleteCoinByCode = exports.getCoinByCode = exports.getCoins = exports.CoinModel = exports.coinSchema = void 0;
const mongoose_1 = __importStar(require("mongoose"));
const api_error_1 = require("../utils/api-error");
exports.coinSchema = new mongoose_1.Schema({
    name: {
        type: String,
        required: true,
        unique: true,
        index: true
    },
    code: {
        type: String,
        required: true,
        unique: true,
        index: true
    },
    rank: {
        type: Number,
        required: true
    },
    image: {
        png32: {
            type: String,
            required: true
        },
        png64: {
            type: String,
            required: true
        },
    },
    allTimeHighUSD: {
        type: Number,
        required: true
    },
    rate: {
        type: Number,
        required: true
    },
    volume: {
        type: Number,
        required: true
    },
    percentageChangeInPrice: {
        hour: {
            type: Number,
            required: true
        },
        day: {
            type: Number,
            required: true
        },
        week: {
            type: Number,
            required: true
        },
    }
}, {
    timestamps: true
});
exports.CoinModel = mongoose_1.default.model('Coin', exports.coinSchema);
// User Services
const getCoins = () => exports.CoinModel.find();
exports.getCoins = getCoins;
const getCoinByCode = (code) => exports.CoinModel.findOne({ code });
exports.getCoinByCode = getCoinByCode;
const deleteCoinByCode = (code) => exports.CoinModel.findOneAndDelete({ code });
exports.deleteCoinByCode = deleteCoinByCode;
const createMultipleCoins = (values) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const bulkOps = values.map((coin) => ({
            updateOne: {
                filter: { code: coin.code },
                update: { $set: coin },
                upsert: true
            }
        }));
        const res = yield exports.CoinModel.bulkWrite(bulkOps);
        return res;
    }
    catch (error) {
        throw new api_error_1.ApiError(500, "something went wrong while create multiple coins");
    }
});
exports.createMultipleCoins = createMultipleCoins;
const updateMultipleCoins = (values) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const bulkOps = values.map((coin) => ({
            updateOne: {
                filter: { code: coin.code },
                update: { $set: coin },
                upsert: true
            }
        }));
        const res = yield exports.CoinModel.bulkWrite(bulkOps);
        return res;
    }
    catch (error) {
        throw new api_error_1.ApiError(500, "something went wrong while create multiple coins");
    }
});
exports.updateMultipleCoins = updateMultipleCoins;
