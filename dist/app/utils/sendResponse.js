"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// response type
const sendResponse = (res, data) => {
    res.status(data === null || data === void 0 ? void 0 : data.statusCode).json({
        success: data.success,
        message: data.message,
        token: data.token,
        data: data.data,
        redirectUrl: data.redirectUrl,
    });
};
exports.default = sendResponse;
