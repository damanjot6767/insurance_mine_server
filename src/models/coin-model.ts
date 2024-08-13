import mongoose, { Schema, Document, Types } from 'mongoose';
import jwt from "jsonwebtoken"
import { ApiError } from '../utils/api-error';
import { CoinResponseDto, CreateCoinDto, UpdateCoinDto } from '../controllers/coin/dto';



export const coinSchema = new Schema(
    {
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
    },
    {
        timestamps: true
    }
)

export const CoinModel = mongoose.model('Coin', coinSchema);


// User Services
export const getCoins = (): Promise<CoinResponseDto[]> => CoinModel.find();
export const getCoinByCode = (code: string): Promise<CoinResponseDto | any> => CoinModel.findOne({ code });
export const deleteCoinByCode = (code: string): any => CoinModel.findOneAndDelete({ code });

export const createMultipleCoins = async (values: CreateCoinDto[]): Promise<any> => {
    try {
        const bulkOps = values.map((coin) => ({
            updateOne: {
                filter: { code: coin.code },
                update: { $set: coin },
                upsert: true
            }
        }))

        const res = await CoinModel.bulkWrite(bulkOps);
        return res
    } catch (error) {
        throw new ApiError(500, "something went wrong while create multiple coins")
    }
}

export const updateMultipleCoins = async (values: CreateCoinDto[]): Promise<any> => {
    try {
        const bulkOps = values.map((coin) => ({
            updateOne: {
                filter: { code: coin.code },
                update: { $set: coin },
                upsert: true
            }
        }))

        const res = await CoinModel.bulkWrite(bulkOps);
        return res
    } catch (error) {
        throw new ApiError(500, "something went wrong while create multiple coins")
    }
}