"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthRoutes = void 0;
const express_1 = __importDefault(require("express"));
const auth_controller_1 = require("./auth.controller");
const validateRequest_1 = __importDefault(require("../../middlewares/validateRequest"));
const auth_validation_1 = require("./auth.validation");
const user_constant_1 = require("../user/user.constant");
const auth_1 = __importDefault(require("../../middlewares/auth"));
const router = express_1.default.Router();
// singup
router.post('/register', (0, validateRequest_1.default)(auth_validation_1.AuthValidation.signinValidationSchema), auth_controller_1.AuthControllers.signUp);
// Verify Email
router.get('/verify-email', auth_controller_1.AuthControllers.verifyEmail);
// login
router.post('/login', (0, validateRequest_1.default)(auth_validation_1.AuthValidation.loginValidationSchema), auth_controller_1.AuthControllers.loginUser);
// get all users by admin
router.get('/users', (0, auth_1.default)(user_constant_1.USER_ROLE.admin), auth_controller_1.AuthControllers.getAllUsers);
exports.AuthRoutes = router;
