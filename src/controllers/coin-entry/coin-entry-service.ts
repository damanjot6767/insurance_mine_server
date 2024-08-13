import { createMultipleCoinEntries, getCoinEntriesByCoinIdwithCoinData, getLatestCoinEntryByCoinId } from "../../models/coin-entries-model";
import { ApiError } from "../../utils/api-error";
import { getCoinByCodeService } from "../coin/coin-service";
import { CoinEntry, CoinEntryResponseDto, CreateCoinEntryDto } from "./dto";

//this service internally call by our setInternal function server side
export const createMultipleCoinEntriesService = async (values: CreateCoinEntryDto[]): Promise<any> => {
    try {
        const coinEntryPromises = values.filter(async (coin) => {
            const coinEntry = await getLatestCoinEntryByCoinIdService(coin.coinId);
            if (!coinEntry || coinEntry.rate !== coin.rate) {
                return coin;
            }
        });

        // Await all promises and filter out undefined results
        const newCoinEntries = (await Promise.all(coinEntryPromises)) as CreateCoinEntryDto[];

        const res = await createMultipleCoinEntries(newCoinEntries);
        return res
    } catch (error) {
        throw error;
    }
}

export const getCoinEntriesByCoinIdwithCoinDataService = async (coinId: string): Promise<CoinEntryResponseDto[]> => {
    const isCoinExist = await getCoinByCodeService(coinId)
    const res = await getCoinEntriesByCoinIdwithCoinData(coinId)
    return res
}


//this service internaly use this file only
const getLatestCoinEntryByCoinIdService = async (coinId: string): Promise<CoinEntryResponseDto> => {

    const res = await getLatestCoinEntryByCoinId(coinId)
    return res
}

