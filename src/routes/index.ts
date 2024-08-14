
import policyRouter from './policy-route'
import { addNewRoute, createJsonDoc } from '../utils/swagger-util';
import { Router } from 'express';

const routes = [
    ...policyRouter
]

//-----------------------swagger setup
// if (process.env.NODE_ENV==="development") {
    createJsonDoc();

    routes.forEach(route => {
        addNewRoute(route.joiSchemaForSwagger, route.path, route.method.toLowerCase(), route.auth);
    });
// }

const allRouters = Router();


routes.forEach(route => {
    if (route.middlewares.length > 0) {
        //@ts-ignore
        allRouters[route.method](route.path, ...route.middlewares, route.handler);
    } else {
        //@ts-ignore
        allRouters[route.method](route.path, route.handler);
    }
});

export {allRouters};