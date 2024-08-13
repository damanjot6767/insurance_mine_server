import { Coin } from './coin-dto';

interface UpdateUserResponseDto extends Coin {
}

interface UpdateCoinDto {
    allTimeHighUSD: number;
    rate: number;
    volume: number;
    percentageChangeInPrice: {
        hour: number;
        day: number;
        week: number;
    };
}

export { UpdateUserResponseDto, UpdateCoinDto }

