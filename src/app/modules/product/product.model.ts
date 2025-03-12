import mongoose,{ Schema, model } from 'mongoose';
import { TProduct, TRating, TReviews, TSize } from './product.interface';


// Reviews Schema
const ReviewsSchema = new Schema<TReviews>({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    score: { type: Number, required: true, min: 1, max: 5 },
});

// Rating Schema
const RatingSchema = new Schema<TRating>({
    average: { type: Number, default: 0 },
    count: { type: Number, default: 0 },
    reviews: [ReviewsSchema], // Array of reviews
});

// Size Schema
const SizeSchema = new Schema<TSize>({
    label: { type: String, enum: ["S", "M", "L", "XL", "XXL"], required: true },
    waist: { type: Number, required: true },
    length: { type: Number },
    unit: { type: String, enum: ["inches", "cm"], required: true },
});


// product Schema
const productSchema = new Schema<TProduct>({
    name: { type: String,  unique: true, required: true, trim: true },
    description: { type: String, required: true },
    color: { type: String, required: true },
    brand: { type: String, required: true },
    size: [SizeSchema], // Array of sizes
    fabric: { type: String, required: true },
    price: { type: Number, required: true, min: 0 },
    category: { type: String, required: true },
    stockSize: { type: Number, required: true },
    stockStatus: { type: Boolean, required: true },
    coverImage: { type: String, required: true }, // Cover image
    images: [{ type: String, required: true }], // Array of image URLs
    rating: { type: RatingSchema, default: { average: 0, count: 0, reviews: [] } },
    isDeleted:  { type: Boolean, required: true },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now },
},
{ timestamps: true });

export const Product = model<TProduct>('Product', productSchema);
