"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FacilityValidation = exports.updateProductValidationSchema = exports.insertProductValidationSchema = void 0;
const zod_1 = require("zod");
// review schema
const ReviewSchema = zod_1.z.object({
    userId: zod_1.z.string().trim().min(1, { message: "User ID is required" }),
    score: zod_1.z.number().min(1).max(5, { message: "Rating must be between 1 and 5" }),
});
// rating schema
const RatingSchema = zod_1.z.object({
    average: zod_1.z.number().min(0).max(5).default(0),
    count: zod_1.z.number().min(0).default(0),
    reviews: zod_1.z.array(ReviewSchema).default([]),
}).optional();
// size schema
const SizeSchema = zod_1.z.object({
    label: zod_1.z.enum(["S", "M", "L", "XL", "XXL"]),
    waist: zod_1.z.number().min(20).max(50, { message: "Waist size must be reasonable" }),
    length: zod_1.z.number().optional(),
    unit: zod_1.z.enum(["inches", "cm"]),
});
// validation for inseert Product 
exports.insertProductValidationSchema = zod_1.z.object({
    body: zod_1.z.object({
        name: zod_1.z.string().trim().min(1, { message: "Name is required" }),
        description: zod_1.z.string().trim().min(1, { message: "Description is required" }),
        color: zod_1.z.string().trim().min(1, { message: "Color is required" }),
        brand: zod_1.z.string().trim().min(1, { message: "Brand is required" }),
        size: zod_1.z.array(SizeSchema).nonempty({ message: "At least one size is required" }),
        fabric: zod_1.z.string().trim().min(1, { message: "Fabric is required" }),
        price: zod_1.z.number().min(0, { message: "Price must be a positive number" }),
        category: zod_1.z.string().trim().min(1, { message: "Category is required" }),
        stockSize: zod_1.z.number().min(0, { message: "Stock size must be positive" }),
        stockStatus: zod_1.z.boolean().default(true),
        images: zod_1.z.array(zod_1.z.string().trim().url({ message: "Invalid image URL" })).min(1, { message: "At least one image is required" }),
        rating: RatingSchema,
        isDeleted: zod_1.z.boolean().default(false),
        createdAt: zod_1.z.date().default(new Date()),
        updatedAt: zod_1.z.date().default(new Date()),
    }),
});
// validation for updating
exports.updateProductValidationSchema = zod_1.z.object({
    body: zod_1.z.object({
        name: zod_1.z.string().trim().min(1).optional(),
        description: zod_1.z.string().trim().min(1).optional(),
        color: zod_1.z.string().trim().min(1).optional(),
        brand: zod_1.z.string().trim().min(1).optional(),
        size: zod_1.z.array(SizeSchema).min(1).optional(),
        fabric: zod_1.z.string().trim().min(1).optional(),
        price: zod_1.z.number().min(0).optional(),
        category: zod_1.z.string().trim().min(1).optional(),
        stockSize: zod_1.z.number().min(0).optional(),
        stockStatus: zod_1.z.boolean().default(true).optional(),
        images: zod_1.z.array(zod_1.z.string().trim().url({ message: "Invalid image URL" })).min(1).optional(),
        rating: RatingSchema.optional(),
        isDeleted: zod_1.z.boolean().default(false).optional(),
    }),
});
exports.FacilityValidation = {
    insertProductValidationSchema: exports.insertProductValidationSchema,
    updateProductValidationSchema: exports.updateProductValidationSchema,
};
