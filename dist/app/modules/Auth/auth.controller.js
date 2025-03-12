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
exports.AuthControllers = void 0;
const http_status_1 = __importDefault(require("http-status"));
const catchAsync_1 = __importDefault(require("../../utils/catchAsync"));
const sendResponse_1 = __importDefault(require("../../utils/sendResponse"));
const auth_service_1 = require("./auth.service");
const config_1 = __importDefault(require("../../config"));
const auth_utils_1 = require("./auth.utils");
// signup
const signUp = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { email } = req.body;
    if (!(0, auth_utils_1.validateEmail)(email)) {
        return (0, sendResponse_1.default)(res, {
            statusCode: http_status_1.default.BAD_REQUEST,
            success: false,
            message: 'Invalid email',
            data: null,
        });
    }
    const user = yield auth_service_1.AuthServices.createUserIntoDB(req.body);
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: 'User registered successfully. Please check your email for verification.',
        data: user,
    });
}));
// verify email
const verifyEmail = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    console.log('Received verification request:', req.query);
    const token = req.query.verificationToken;
    // Find user by token
    if (!token) {
        console.log("Verification failed: Missing token");
        return res.redirect(`${config_1.default.frontend}/verification-failed?reason=missing-token`);
    }
    const user = yield auth_service_1.AuthServices.verificationEmailService(token);
    console.log("from controller", user);
    if (!user) {
        console.log("Verification failed: Invalid token");
        return res.redirect(`${config_1.default.frontend}/verification-failed?reason=invalid-token`);
    }
    // Mark user as verified
    user.isVerified = true;
    user.verificationToken = null; // Clear the token after verification
    yield user.save();
    console.log("User verified successfully");
    return res.redirect(`${config_1.default.frontend}/verification-success`);
}));
// login
const loginUser = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield auth_service_1.AuthServices.loginUser(req.body);
    const { refreshToken, accessToken, userData } = result;
    res.cookie('refreshToken', refreshToken, {
        secure: config_1.default.NODE_ENV === 'production',
        httpOnly: true,
    });
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: 'User is logged in succesfully!',
        token: accessToken,
        data: {
            userData
        },
    });
}));
// get all users
const getAllUsers = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield auth_service_1.AuthServices.getAllUsersFromDB();
    // if no data found
    if (result.length == 0) {
        (0, sendResponse_1.default)(res, {
            statusCode: http_status_1.default.NOT_FOUND,
            success: false,
            message: 'No Data Found',
            data: [],
        });
    }
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: 'Users retrieved successfully',
        data: result,
    });
}));
// refreshToken
const refreshToken = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { refreshToken } = req.cookies;
    const result = yield auth_service_1.AuthServices.refreshToken(refreshToken);
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: 'Access token is retrieved succesfully!',
        data: result,
    });
}));
exports.AuthControllers = {
    signUp,
    verifyEmail,
    loginUser,
    getAllUsers,
    refreshToken,
};
