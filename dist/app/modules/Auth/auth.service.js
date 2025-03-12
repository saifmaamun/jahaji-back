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
exports.AuthServices = void 0;
const user_model_1 = require("../user/user.model");
const AppError_1 = __importDefault(require("../../errors/AppError"));
const http_status_1 = __importDefault(require("http-status"));
const config_1 = __importDefault(require("../../config"));
const auth_utils_1 = require("./auth.utils");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
// signup
const createUserIntoDB = (userData) => __awaiter(void 0, void 0, void 0, function* () {
    const jwtPayload = {
        email: userData.email,
        role: userData.role,
    };
    const verificationToken = (0, auth_utils_1.createToken)(jwtPayload, config_1.default.jwt_access_secret, config_1.default.jwt_access_expires_in);
    ;
    const user = yield user_model_1.User.create(Object.assign(Object.assign({}, userData), { verificationToken, isVerified: false }));
    ;
    // const token = generateVerificationToken(user.email);
    yield (0, auth_utils_1.sendVerificationEmail)(user.email, verificationToken);
    // console.log('from signin',user)
    return user;
});
// verification Email 
const verificationEmailService = (token) => __awaiter(void 0, void 0, void 0, function* () {
    console.log("Verification attempt with token:", token);
    // Decode the token if it's URL encoded
    const decodedToken = decodeURIComponent(token);
    console.log("Decoded token:", decodedToken);
    let user = yield user_model_1.User.findOne({ verificationToken: token });
    if (!user) {
        user = yield user_model_1.User.findOne({ verificationToken: decodedToken });
        console.log("Found user with decoded token:", !!user);
    }
    console.log('from service', user);
    return user;
});
// verify user email
const verifyUserEmail = (email) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield user_model_1.User.findOne({ email });
    if (!user)
        throw new Error('User not found');
    user.isVerified = true;
    yield user.save();
    console.log(' from verify', user);
    return user;
});
// login
const loginUser = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    // checking if the user is exist
    const user = yield user_model_1.User.isUserExistsByEmail(payload.email);
    if (!user) {
        throw new AppError_1.default(http_status_1.default.NOT_FOUND, "User doesn't exist!");
    }
    // check if verified
    if (!user.isVerified)
        throw new Error('Please verify your email before logging in');
    //save data without password
    const userData = yield user_model_1.User.findOne({ email: user.email });
    //checking if the password is correct
    console.log("payload.password", payload === null || payload === void 0 ? void 0 : payload.password);
    console.log("user.password", user === null || user === void 0 ? void 0 : user.password);
    if (!(yield user_model_1.User.isPasswordMatched(payload === null || payload === void 0 ? void 0 : payload.password, user === null || user === void 0 ? void 0 : user.password)))
        throw new AppError_1.default(http_status_1.default.FORBIDDEN, 'Wrong Password');
    //create token and sent to the  client
    const jwtPayload = {
        email: user.email,
        role: user.role,
    };
    const accessToken = (0, auth_utils_1.createToken)(jwtPayload, config_1.default.jwt_access_secret, config_1.default.jwt_access_expires_in);
    const refreshToken = (0, auth_utils_1.createToken)(jwtPayload, config_1.default.jwt_refresh_secret, config_1.default.jwt_refresh_expires_in);
    return {
        userData,
        accessToken,
        refreshToken,
    };
});
// all users
const getAllUsersFromDB = () => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield user_model_1.User.find();
    return result;
});
// refresh token
const refreshToken = (token) => __awaiter(void 0, void 0, void 0, function* () {
    // checking if the given token is valid
    const decoded = jsonwebtoken_1.default.verify(token, config_1.default.jwt_refresh_secret);
    const { email } = decoded;
    // checking if the user is exist
    const user = yield user_model_1.User.isUserExistsByEmail(email);
    if (!user) {
        throw new AppError_1.default(http_status_1.default.NOT_FOUND, 'This user is not found !');
    }
    const jwtPayload = {
        email: user.email,
        role: user.role,
    };
    const accessToken = (0, auth_utils_1.createToken)(jwtPayload, config_1.default.jwt_access_secret, config_1.default.jwt_access_expires_in);
    return {
        accessToken,
    };
});
exports.AuthServices = {
    createUserIntoDB,
    verificationEmailService,
    verifyUserEmail,
    loginUser,
    getAllUsersFromDB,
    refreshToken,
};
