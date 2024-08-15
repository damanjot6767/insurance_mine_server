"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.removeFile = void 0;
const promises_1 = __importDefault(require("fs/promises"));
const api_error_1 = require("./api-error");
const removeFile = async (filePath) => {
    try {
        await promises_1.default.unlink(filePath);
        console.log(`File ${filePath} removed successfully.`);
    }
    catch (error) {
        console.error(`Error removing file ${filePath}: Error: ${error.message}`);
        throw new api_error_1.ApiError(400, `Error removing file ${filePath}: Error: ${error.message}`);
    }
};
exports.removeFile = removeFile;
