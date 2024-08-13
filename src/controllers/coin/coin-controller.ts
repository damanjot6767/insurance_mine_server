import { ApiResponse } from "../../utils/api-response";
import { asyncHandler } from "../../utils/async-handler";
import { getCoinByCodeService, getCoinsService } from "./coin-service";

export const getCoins = asyncHandler(async (req, res) => {

    const response = await getCoinsService()

    return res.
        status(200).
        json(
            new ApiResponse(
                201, response, 'coins get successfully'
            )
        )
})

export const getCoinByCode = asyncHandler(async (req, res) => {

    const response = await getCoinByCodeService(req.params.code)

    return res.
        status(200).
        json(
            new ApiResponse(
                201, response, 'Coin get successfully'
            )
        )
})