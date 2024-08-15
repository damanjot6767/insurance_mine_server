"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.swaggerOptions = exports.cookieOptions = exports.AvailableGenders = exports.UserGendersEnum = exports.AvailableUserRoles = exports.UserRolesEnum = exports.DB_NAME = void 0;
exports.DB_NAME = 'insurance';
exports.UserRolesEnum = {
    ACTIVE_CLIENT: "Active Client",
    INACTIVE_CLIENT: "InActive Client",
};
exports.AvailableUserRoles = Object.values(exports.UserRolesEnum);
exports.UserGendersEnum = {
    MALE: "Male",
    FEMALE: "Female"
};
exports.AvailableGenders = Object.values(exports.UserGendersEnum);
exports.cookieOptions = {
    domain: 'localhost',
    path: '/',
    httpOnly: true,
    secure: false, // Adjust this based on your environment (e.g., use `true` in production with HTTPS)
};
exports.swaggerOptions = {
    swaggerDefinition: {
        info: {
            title: "Library API",
            version: '1.0.0',
        },
    },
    apis: ['./routes/*.ts'],
};
