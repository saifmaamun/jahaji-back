"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProductRoutes = void 0;
const express_1 = __importDefault(require("express"));
const product_controller_1 = require("./product.controller");
const validateRequest_1 = __importDefault(require("../../middlewares/validateRequest"));
const product_validations_1 = require("./product.validations");
const user_constant_1 = require("../user/user.constant");
const auth_1 = __importDefault(require("../../middlewares/auth"));
const router = express_1.default.Router();
// detch single product
router.get('/:id', product_controller_1.ProductControllers.getSingleProduct);
// delete product
router.delete('/:id', (0, auth_1.default)(user_constant_1.USER_ROLE.admin), product_controller_1.ProductControllers.deleteProduct);
// update product
router.patch('/:id', (0, auth_1.default)(user_constant_1.USER_ROLE.admin), (0, validateRequest_1.default)(product_validations_1.updateProductValidationSchema), product_controller_1.ProductControllers.updateProduct);
// get alll products
router.get('/', product_controller_1.ProductControllers.getAllProduct);
// insert product
router.post('/new', (0, auth_1.default)(user_constant_1.USER_ROLE.admin), (0, validateRequest_1.default)(product_validations_1.insertProductValidationSchema), product_controller_1.ProductControllers.insertProduct);
exports.ProductRoutes = router;
