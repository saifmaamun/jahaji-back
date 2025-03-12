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
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProductService = void 0;
const product_model_1 = require("./product.model");
// insert product by admin
const insertProductIntoDB = (productData) => __awaiter(void 0, void 0, void 0, function* () {
    const product = yield product_model_1.Product.create(productData);
    console.log(product);
    return product;
});
// fetch all product
const getAllProductFromDB = () => __awaiter(void 0, void 0, void 0, function* () {
    const products = yield product_model_1.Product.find({ isDeleted: { $ne: true } });
    return products;
});
// fetch single product by ID
const getSingleProductById = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield product_model_1.Product.findById(id);
    return result;
});
// updating the facility
const updateProductIntoDB = (id, payload) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield product_model_1.Product.findByIdAndUpdate(id, payload, {
        new: true,
        runValidators: true,
    });
    return result;
});
// deleting the facility
const deleteProductFromDB = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield product_model_1.Product.findByIdAndUpdate(id, {
        isDeleted: true,
    });
    return result;
});
exports.ProductService = {
    insertProductIntoDB,
    getAllProductFromDB,
    getSingleProductById,
    updateProductIntoDB,
    deleteProductFromDB
};
