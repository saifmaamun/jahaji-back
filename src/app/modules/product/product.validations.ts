import { z } from 'zod';


// review schema
const ReviewSchema = z.object({
    userId: z.string().trim().min(1, { message: "User ID is required" }),
    score: z.number().min(1).max(5, { message: "Rating must be between 1 and 5" }),
  });
  

// rating schema
  const RatingSchema = z.object({
    average: z.number().min(0).max(5).default(0),
    count: z.number().min(0).default(0),
    reviews: z.array(ReviewSchema).default([]),
  }).optional();
  

// size schema
  const SizeSchema = z.object({
    label: z.enum(["S", "M", "L", "XL", "XXL"]),
    waist: z.number().min(20).max(50, { message: "Waist size must be reasonable" }),
    length: z.number().optional(),
    unit: z.enum(["inches", "cm"]),
  });




// validation for inseert Product 
export const insertProductValidationSchema = z.object({
    body: z.object({
        name: z.string().trim().min(1, { message: "Name is required" }),
        description: z.string().trim().min(1, { message: "Description is required" }),
        color: z.string().trim().min(1, { message: "Color is required" }),
        brand: z.string().trim().min(1, { message: "Brand is required" }),
        size: z.array(SizeSchema).nonempty({ message: "At least one size is required" }),
        fabric: z.string().trim().min(1, { message: "Fabric is required" }),
        price: z.number().min(0, { message: "Price must be a positive number" }),
        category: z.string().trim().min(1, { message: "Category is required" }),
        stockSize: z.number().min(0, { message: "Stock size must be positive" }),
        stockStatus: z.boolean().default(true),
        images: z.array(z.string().trim().url({ message: "Invalid image URL" })).min(1, { message: "At least one image is required" }),
        rating: RatingSchema,
        isDeleted:   z.boolean().default(false),
        createdAt: z.date().default(new Date()),
        updatedAt: z.date().default(new Date()),
      }),
});

// validation for updating
export const updateProductValidationSchema = z.object({
  body: z.object({
    name: z.string().trim().min(1).optional(),
    description: z.string().trim().min(1).optional(),
    imgUrl: z.string().trim().min(1).optional(),
    pricePerHour: z.number().min(0).optional(),
    location: z.string().trim().min(1).optional(),
    isDeleted: z.boolean().optional().default(false).optional(),
  }),
});

export const FacilityValidation = {
   insertProductValidationSchema,
   updateProductValidationSchema,
};
