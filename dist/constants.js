"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.swaggerOptions = exports.DB_NAME = void 0;
exports.DB_NAME = 'crypto';
exports.swaggerOptions = {
    swaggerDefinition: {
        info: {
            title: "Library API",
            version: '1.0.0',
        },
    },
    apis: ['./routes/*.ts'],
};
