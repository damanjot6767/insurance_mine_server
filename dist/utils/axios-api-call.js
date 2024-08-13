"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AxiosApiCall = exports.AxiosApiMethodEnum = void 0;
const axios_1 = __importDefault(require("axios"));
const api_error_1 = require("./api-error");
function AxiosApiCall(method, url, config, body) {
    var _a, _b, _c;
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const headers = config.headers ? Object.assign({}, config.headers) : undefined;
            const params = config.params ? Object.assign({}, config.params) : undefined;
            const res = yield axios_1.default.request({
                headers,
                url,
                method,
                data: body ? body : undefined,
                params
            });
            return res.data;
        }
        catch (e) {
            console.log(`MakeAxiosCall ${url}, ${method} error: `, e);
            if (((_a = e.response) === null || _a === void 0 ? void 0 : _a.status) === 400) {
                throw new api_error_1.ApiError(400, e.response.data.message);
            }
            else if (((_b = e.response) === null || _b === void 0 ? void 0 : _b.status) === 401) {
                throw new api_error_1.ApiError(401, e.response.data.message);
            }
            else if (((_c = e.response) === null || _c === void 0 ? void 0 : _c.status) === 404) {
                throw new api_error_1.ApiError(404, e.response.data.message);
            }
            else {
                throw new api_error_1.ApiError(500, e.response.data.message);
            }
        }
    });
}
exports.AxiosApiCall = AxiosApiCall;
var AxiosApiMethodEnum;
(function (AxiosApiMethodEnum) {
    AxiosApiMethodEnum["GET"] = "GET";
    AxiosApiMethodEnum["PUT"] = "PUT";
    AxiosApiMethodEnum["POST"] = "POST";
    AxiosApiMethodEnum["DELETE"] = "DELETE";
})(AxiosApiMethodEnum || (exports.AxiosApiMethodEnum = AxiosApiMethodEnum = {}));
