"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const coin_controller_1 = require("../controllers/coin/coin-controller");
const validation_1 = require("../controllers/coin/validation");
//for now all apis publically open
const routes = [
    {
        method: 'get',
        path: '/v1/coin/get-all-coins',
        joiSchemaForSwagger: {
            group: 'Coin',
            description: `Route to get all coins of any role.`,
            model: 'Coin',
        },
        middlewares: [],
        auth: false,
        handler: coin_controller_1.getCoins
    },
    {
        method: 'get',
        path: '/v1/coin/:code',
        joiSchemaForSwagger: {
            group: 'Coin',
            description: `Route get coin by code.`,
            params: validation_1.getCoinByIdParamJoiValidationObject,
        },
        middlewares: [],
        auth: false,
        handler: coin_controller_1.getCoinByCode
    }
];
exports.default = routes;
