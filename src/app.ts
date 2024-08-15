import express from "express";
import { createServer } from 'http';
import fs from "fs";
import path from "path";
import cors from "cors";
import cookieParser from "cookie-parser";
import compression from 'compression';
import logger from 'morgan'
import { fileURLToPath } from 'url';


const app = express();

app.use(cors({
    origin: "*"
}));

app.use(express.json({ limit: '20kb' }));
app.use(express.urlencoded({ extended: true, limit: '20kb' }));
app.use(express.static(path.join(__dirname, '../public')));
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.use(cookieParser());
app.use(compression());
app.use(logger('dev'));

//--------------allRoutes
import { allRouters } from "./routes";

app.use(allRouters)


//------------------Swagger setup
import swaggerUi from 'swagger-ui-express';
import swaggerDocs from "../swagger.json";


const CSS_URL = "https://cdnjs.cloudflare.com/ajax/libs/swagger-ui/4.6.0/swagger-ui.min.css";
app.use('/documentation', swaggerUi.serve, swaggerUi.setup(swaggerDocs, {
    customCss:
        '.swagger-ui .opblock .opblock-summary-path-description-wrapper { align-items: center; display: flex; flex-wrap: wrap; gap: 0 10px; padding: 0 10px; width: 100%; }',
    customCssUrl: CSS_URL,
}));


export { app }