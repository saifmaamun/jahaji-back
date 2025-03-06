

import jwt, { type Secret, type SignOptions } from "jsonwebtoken"
import type { StringValue } from "ms"
import config from '../../config';
import nodemailer from 'nodemailer';
import emailValidator from 'email-validator';
import { JwtPayload } from './auth.interface';


// create token request
export const createToken = (jwtPayload: JwtPayload, secret: string, expiresIn: string | number): string => {
  const signOptions: SignOptions = {
    expiresIn: expiresIn as StringValue | number,
  }

  return jwt.sign(jwtPayload, secret as Secret, signOptions)
}
// verification token
export const generateVerificationToken = (email: string): string => {
  return jwt.sign({ email }, config.jwt_secret_key as string, { expiresIn: '1h' });
};


// send verification email
export const sendVerificationEmail = async (email: string, token: string) => {
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: { user: 'sadifmamun@gmail.com', pass: 'udfwalfnfmkrpaag' },
  });

  const verificationUrl = `http://yourdomain.com/verify-email?email=${email}&token=${token}`;
  await transporter.sendMail({
    from: 'your-email@gmail.com',
    to: email,
    subject: 'Verify Your Email',
    text: `Click the link to verify: ${verificationUrl}`,
  });
};

// email validation
export const validateEmail = (email: string): boolean => emailValidator.validate(email);

