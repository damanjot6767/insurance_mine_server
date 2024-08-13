import { CoinEntry } from './coin-entry-dto';

interface CreateCoinEntryResponseDto extends CoinEntry {
}

interface CreateCoinEntryDto  {
    rate: number;
    volume: number;
    coinId: string;
    percentageChangeInPrice: {
        hour: number;
        day: number;
        week: number;
    };
}

export { CreateCoinEntryResponseDto, CreateCoinEntryDto };;;

