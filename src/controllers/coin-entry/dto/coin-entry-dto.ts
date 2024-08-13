import { Coin } from "../../coin/dto";

interface CoinEntry {
    _id: string;
    rate: number;
    volume: number;
    coinId: number;
    percentageChangeInPrice: {
        hour: number;
        day: number;
        week: number;
    };
    coin : Coin
    createdAt?: Date;
    updatedAt?: Date;
}

interface CoinEntryResponseDto extends CoinEntry {
}

export { CoinEntry, CoinEntryResponseDto }


