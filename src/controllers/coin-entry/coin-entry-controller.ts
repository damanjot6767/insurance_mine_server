import { ApiResponse } from "../../utils/api-response";
import { asyncHandler } from "../../utils/async-handler";
import { getCoinEntriesByCoinIdwithCoinDataService } from "./coin-entry-service";

export const getCoinEntriesByCoinIdwithCoinData = asyncHandler(async (req, res) => {

    const response = await getCoinEntriesByCoinIdwithCoinDataService(req.params.coinId)

    return res.
        status(200).
        json(
            new ApiResponse(
                201, response, 'coins enties get successfully'
            )
        )
})
