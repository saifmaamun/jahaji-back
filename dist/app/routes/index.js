"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const auth_route_1 = require("../modules/Auth/auth.route");
const product_route_1 = require("../modules/product/product.route");
const router = (0, express_1.Router)();
const moduleRoutes = [
    // Products Route
    {
        path: '/products',
        route: product_route_1.ProductRoutes
    },
    // auth
    {
        path: '/auth',
        route: auth_route_1.AuthRoutes
    }
];
moduleRoutes.forEach((route) => router.use(route.path, route.route));
exports.default = router;
