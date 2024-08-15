"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.asyncHandler = void 0;
const asyncHandler = (requestHandler) => {
    return async (req, res, next) => {
        try {
            await Promise.resolve(requestHandler(req, res, next));
        }
        catch (err) {
            res.status(err?.statusCode || 400).json({
                statusCode: err?.statusCode || 400,
                data: null,
                message: err.message
            });
        }
    };
};
exports.asyncHandler = asyncHandler;
