//this service internally call by our setInternal function server side

import { Schema } from "mongoose";
import { AxiosApiCall, AxiosApiMethodEnum } from "../utils/axios-api-call";

const liveCoinApiConfig = {
    baseUrl: process.env.LIVE_COIN_API_URL,
    apiKey: process.env.LIVE_COIN_API_SECRET
}

export const getCoinsFromLiveCoinApi = async (): Promise<any> => {
    try {

        const res: any = await AxiosApiCall(
            AxiosApiMethodEnum.POST,`${liveCoinApiConfig.baseUrl}/coins/list`,
            {
                headers: { "X-Api-Key": liveCoinApiConfig.apiKey }
            },
            {
                "currency": "USD",
                "sort": "rank",
                "order": "ascending",
                "offset": 0,
                "limit": 10,
                "meta": true
            } // default body parameters
        )
        const newData = res.map((coin:any)=>({
            name: coin.name,
            code: coin.code,
            rank: coin.rank,
            image: coin.image,
            allTimeHighUSD: coin.allTimeHighUSD,
            rate: coin.rate,
            volume: coin.volume,
            percentageChangeInPrice: {
                hour: (coin.delta.hour-1)*100,// converting price change in percentage
                day: (coin.delta.day-1)*100,
                week: (coin.delta.hour-1)*100,
            }
        }))
        return newData
    } catch (error) {
        throw error;
    }
}


export const getCoinDetailFromLiveCoinApi= async (code: string): Promise<any> => {
    try {

        const res: any = await AxiosApiCall(AxiosApiMethodEnum.GET,`${liveCoinApiConfig.baseUrl}/coin/${code}`,{},{})
        return res
    } catch (error) {
        throw error;
    }
}