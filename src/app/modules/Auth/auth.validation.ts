import { z } from 'zod';


// validation for signin
const signinValidationSchema = z.object({
  body: z.object({
    name: z.string().min(1, { message: 'Name is required.' }),
    email: z.string().email({ message: 'Invalid email format.' }),
    password: z.string().min(8, { message: 'Password is required.' }),
    phone: z.string().min(1, { message: 'Phone number is required.' }),
    role: z.enum(['user', 'admin']).optional(),
    address: z.string().min(1, { message: 'Address is required.' }),
  }),
});





// validation for login
const loginValidationSchema = z.object({
  body: z.object({
    email: z.string({ required_error: 'Email is required.' }),
    password: z.string({ required_error: 'Password is required' }),
  }),
});

// validation for refresh token
const refreshTokenValidationSchema = z.object({
  cookies: z.object({
    refreshToken: z.string({
      required_error: 'Refresh token is required!',
    }),
  }),
});

export const AuthValidation = {
  signinValidationSchema,
  loginValidationSchema,
  refreshTokenValidationSchema,
};
