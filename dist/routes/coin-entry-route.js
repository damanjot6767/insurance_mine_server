"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const validation_1 = require("../controllers/coin-entry/validation");
const coin_entry_controller_1 = require("../controllers/coin-entry/coin-entry-controller");
//for now all apis publically open
const routes = [
    {
        method: 'get',
        path: '/v1/coin-entries/:coinId',
        joiSchemaForSwagger: {
            params: validation_1.getCoinEntryByIdParamJoiValidationObject,
            group: 'Coin Entries',
            description: `Route to coin entries by coinId of any role.`,
            model: 'CoinEntries',
        },
        middlewares: [],
        auth: false,
        handler: coin_entry_controller_1.getCoinEntriesByCoinIdwithCoinData
    },
];
exports.default = routes;
