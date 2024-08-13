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
exports.createMultipleCoinEntries = exports.getCoinEntriesByCoinIdwithCoinData = exports.getLatestCoinEntryByCoinId = exports.CoinEntriesModel = exports.coinEntriesSchema = void 0;
const mongoose_1 = __importStar(require("mongoose"));
const api_error_1 = require("../utils/api-error");
exports.coinEntriesSchema = new mongoose_1.Schema({
    coinId: {
        type: String,
        ref: 'Coins'
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
exports.coinEntriesSchema.virtual('coin', {
    ref: 'Coins',
    localField: 'coinId',
    foreignField: 'code',
    justOne: true
});
exports.coinEntriesSchema.set('toJSON', { virtuals: true });
exports.coinEntriesSchema.set('toObject', { virtuals: true });
exports.CoinEntriesModel = mongoose_1.default.model('CoinEntries', exports.coinEntriesSchema);
// coinEntries Services
const getLatestCoinEntryByCoinId = (coinId) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const res = yield exports.CoinEntriesModel.findOne({ coinId }).sort({ createdAt: -1 });
        return res;
    }
    catch (error) {
        throw new api_error_1.ApiError(500, "Something went wrong while finding latest coi entry by coin id");
    }
});
exports.getLatestCoinEntryByCoinId = getLatestCoinEntryByCoinId;
const getCoinEntriesByCoinIdwithCoinData = (coinId, page = 1, limit = 10) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const coinEntries = yield exports.CoinEntriesModel.aggregate([
            {
                $match: {
                    coinId: coinId
                }
            },
            {
                $lookup: {
                    from: 'coins',
                    foreignField: "code",
                    localField: "coinId",
                    as: "coin"
                }
            },
            {
                $unwind: {
                    path: "$coin",
                    preserveNullAndEmptyArrays: true
                }
            },
            {
                $sort: {
                    createdAt: -1
                }
            },
            {
                $skip: (page - 1) * limit
            },
            {
                $limit: limit
            }
        ]);
        return coinEntries;
    }
    catch (error) {
        throw new api_error_1.ApiError(500, "Something went wrong while finding coin entries");
    }
});
exports.getCoinEntriesByCoinIdwithCoinData = getCoinEntriesByCoinIdwithCoinData;
const createMultipleCoinEntries = (values) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const res = yield exports.CoinEntriesModel.insertMany(values);
        return res;
    }
    catch (error) {
        throw new api_error_1.ApiError(500, "something went wrong while create multiple coin entries");
    }
});
exports.createMultipleCoinEntries = createMultipleCoinEntries;
