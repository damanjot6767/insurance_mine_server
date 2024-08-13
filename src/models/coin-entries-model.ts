import mongoose, { Schema, Document, Types } from 'mongoose';
import { ApiError } from '../utils/api-error';
import { CoinEntryResponseDto, CreateCoinEntryDto } from '../controllers/coin-entry/dto';



export const coinEntriesSchema = new Schema(
    {
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
    },
    {
        timestamps: true
    }
)

coinEntriesSchema.virtual('coin', {
    ref: 'Coins',
    localField: 'coinId',
    foreignField: 'code',
    justOne: true
  });
  
coinEntriesSchema.set('toJSON', { virtuals: true });
coinEntriesSchema.set('toObject', { virtuals: true });

export const CoinEntriesModel = mongoose.model('CoinEntries', coinEntriesSchema);


// coinEntries Services

export const getLatestCoinEntryByCoinId = async ( coinId: string): Promise<CoinEntryResponseDto> => {
    try {
        const res = await CoinEntriesModel.findOne({ coinId }).sort({ createdAt: -1 });
        return res as CoinEntryResponseDto;
    } catch (error) {
        throw new ApiError(500, "Something went wrong while finding latest coi entry by coin id")
    }
}

export const getCoinEntriesByCoinIdwithCoinData = async (coinId: string, page: number = 1, limit: number = 10): Promise<CoinEntryResponseDto[]> => {
    try {
        const coinEntries: any = await CoinEntriesModel.aggregate([
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
    } catch (error) {
        throw new ApiError(500, "Something went wrong while finding coin entries")
    }
}

export const createMultipleCoinEntries = async (values: CreateCoinEntryDto[]): Promise<any> => {
    try {
        const res = await CoinEntriesModel.insertMany(values);
        return res
    } catch (error) {
        throw new ApiError(500, "something went wrong while create multiple coin entries")
    }
}



