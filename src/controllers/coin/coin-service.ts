import { createMultipleCoins, getCoinByCode, getCoins, updateMultipleCoins } from "../../models/coin-model";
import { ApiError } from "../../utils/api-error";
import { CoinResponseDto, CreateCoinDto, UpdateCoinDto } from "./dto";

//this service internally call by our setInternal function server side
export const createMultipleCoinsService = async (values: CoinResponseDto[]): Promise<any> => {
    try {
        const res = await createMultipleCoins(values);
        return res
    } catch (error) {
        throw error;
    }
}

//this service internally call by our setInternal function server side
export const updateMultipleCoinsService = async (values: CreateCoinDto[]): Promise<any> => {
    try{
        const res = await updateMultipleCoins(values);
        return res
    } catch (error) {
        throw error;
    }
}


export const getCoinsService = async (): Promise<CoinResponseDto[]> => {

    const res = await getCoins()
    return res
}

export const getCoinByCodeService = async (code: string): Promise<CoinResponseDto> => {

    const res = await getCoinByCode(code)
    if(!res) throw new ApiError(400, "not found")
    return res
}
