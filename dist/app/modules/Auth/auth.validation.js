"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthValidation = void 0;
const zod_1 = require("zod");
// validation for signin
const signinValidationSchema = zod_1.z.object({
    body: zod_1.z.object({
        name: zod_1.z.string().min(1, { message: 'Name is required.' }),
        email: zod_1.z.string().email({ message: 'Invalid email format.' }),
        password: zod_1.z.string().min(8, { message: 'Password is required.' }),
        phone: zod_1.z.string().min(1, { message: 'Phone number is required.' }),
        role: zod_1.z.enum(['user', 'admin']).optional(),
        address: zod_1.z.string().min(1, { message: 'Address is required.' }),
    }),
});
// validation for login
const loginValidationSchema = zod_1.z.object({
    body: zod_1.z.object({
        email: zod_1.z.string({ required_error: 'Email is required.' }),
        password: zod_1.z.string({ required_error: 'Password is required' }),
    }),
});
// validation for refresh token
const refreshTokenValidationSchema = zod_1.z.object({
    cookies: zod_1.z.object({
        refreshToken: zod_1.z.string({
            required_error: 'Refresh token is required!',
        }),
    }),
});
exports.AuthValidation = {
    signinValidationSchema,
    loginValidationSchema,
    refreshTokenValidationSchema,
};
