"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.Product = void 0;
const mongoose_1 = __importStar(require("mongoose"));
// Reviews Schema
const ReviewsSchema = new mongoose_1.Schema({
    userId: { type: mongoose_1.default.Schema.Types.ObjectId, ref: "User", required: true },
    score: { type: Number, required: true, min: 1, max: 5 },
});
// Rating Schema
const RatingSchema = new mongoose_1.Schema({
    average: { type: Number, default: 0 },
    count: { type: Number, default: 0 },
    reviews: [ReviewsSchema], // Array of reviews
});
// Size Schema
const SizeSchema = new mongoose_1.Schema({
    label: { type: String, enum: ["S", "M", "L", "XL", "XXL"], required: true },
    waist: { type: Number, required: true },
    length: { type: Number },
    unit: { type: String, enum: ["inches", "cm"], required: true },
});
// product Schema
const productSchema = new mongoose_1.Schema({
    name: { type: String, unique: true, required: true, trim: true },
    description: { type: String, required: true },
    color: { type: String, required: true },
    brand: { type: String, required: true },
    size: [SizeSchema], // Array of sizes
    fabric: { type: String, required: true },
    price: { type: Number, required: true, min: 0 },
    category: { type: String, required: true },
    stockSize: { type: Number, required: true },
    stockStatus: { type: Boolean, required: true },
    images: [{ type: String, required: true }], // Array of image URLs
    rating: { type: RatingSchema, default: { average: 0, count: 0, reviews: [] } },
    isDeleted: { type: Boolean, required: true },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now },
}, { timestamps: true });
exports.Product = (0, mongoose_1.model)('Product', productSchema);
