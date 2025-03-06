import mongoose from "mongoose";

export type TReviews={
    userId: mongoose.Types.ObjectId;
    score: number; // Rating between 1-5 
}

export type TRating={
   
        average: number; // Calculated average rating (e.g., 4.5)
        count: number; // Total number of ratings
        reviews: TReviews[];
 
}

export type TSize={
    
        label: "S" | "M" | "L" | "XL" | "XXL"; // Standard size
        waist: number; // Waist measurement in inches or cm
        length?: number; // Optional, for different inseam lengths
        unit:"inches"|"cm"
    
}


export type TProduct={
    name: string;
    description: string;
    color:string;
    brand:string;
    size:TSize[];
    fabric:string;
    price: number;
    category: string;
    stockSize: number;
    stockStatus:boolean;
    images: string[]; // Array of image URLs
    rating:TRating;
    isDeleted: boolean;
    createdAt: Date;
    updatedAt: Date;
}