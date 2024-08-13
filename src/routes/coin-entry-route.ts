import { Router } from "express";
import { getCoinEntryByIdParamJoiValidationObject } from "../controllers/coin-entry/validation";
import { getCoinEntriesByCoinIdwithCoinData } from "../controllers/coin-entry/coin-entry-controller";

//for now all apis publically open
const routes = [
    {
		method: 'get',
		path: '/v1/coin-entries/:coinId',
		joiSchemaForSwagger: {
			params: getCoinEntryByIdParamJoiValidationObject,
			group: 'Coin Entries',
			description: `Route to coin entries by coinId of any role.`,
			model: 'CoinEntries',
		},
		middlewares: [],
		auth: false,
		handler: getCoinEntriesByCoinIdwithCoinData
	},
]

export default routes;