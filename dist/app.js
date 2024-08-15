"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.app = void 0;
const express_1 = __importDefault(require("express"));
const path_1 = __importDefault(require("path"));
const cors_1 = __importDefault(require("cors"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const compression_1 = __importDefault(require("compression"));
const morgan_1 = __importDefault(require("morgan"));
const app = (0, express_1.default)();
exports.app = app;
app.use((0, cors_1.default)({
    origin: "*"
}));
app.use(express_1.default.json({ limit: '20kb' }));
app.use(express_1.default.urlencoded({ extended: true, limit: '20kb' }));
app.use(express_1.default.static(path_1.default.join(__dirname, '../public')));
app.set('view engine', 'ejs');
app.set('views', path_1.default.join(__dirname, 'views'));
app.use((0, cookie_parser_1.default)());
app.use((0, compression_1.default)());
app.use((0, morgan_1.default)('dev'));
//--------------allRoutes
const routes_1 = require("./routes");
app.use(routes_1.allRouters);
//------------------Swagger setup
const swagger_ui_express_1 = __importDefault(require("swagger-ui-express"));
const swagger_json_1 = __importDefault(require("../swagger.json"));
const CSS_URL = "https://cdnjs.cloudflare.com/ajax/libs/swagger-ui/4.6.0/swagger-ui.min.css";
app.use('/documentation', swagger_ui_express_1.default.serve, swagger_ui_express_1.default.setup(swagger_json_1.default, {
    customCss: '.swagger-ui .opblock .opblock-summary-path-description-wrapper { align-items: center; display: flex; flex-wrap: wrap; gap: 0 10px; padding: 0 10px; width: 100%; }',
    customCssUrl: CSS_URL,
}));
