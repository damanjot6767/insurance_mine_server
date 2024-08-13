
interface Coin {
  _id: string;
    name: string;
    code: string;
    rank: number;
    image: {
        png32: string;
        png64: string;
    };
    allTimeHighUSD: number;
    rate: number;
    volume: number;
    percentageChangeInPrice: {
        hour: number;
        day: number;
        week: number;
    };
    createdAt?: Date;
    updatedAt?: Date;
}

interface CoinResponseDto extends Coin {
}

export { Coin, CoinResponseDto }


