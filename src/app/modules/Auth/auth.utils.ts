

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
// export const generateVerificationToken = (email: string): string => {
//   const verificationToken = crypto.randomBytes(32).toString('hex');
//   return jwt.sign({ email }, verificationToken as string, { expiresIn: '1h' });
// };


// send verification email
export const sendVerificationEmail = async (email: string, token: string) => {
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: { user: `${config.user_mail}`, pass:  `${config.user_pass}` },
  });

 // Ensure token is properly encoded for URLs
 const encodedToken = encodeURIComponent(token)


  // const verificationUrl = `${config.frontend}/verify-email?token=${token}`;
  const verificationUrl = `${config.backend}/api/auth/verify-email?verificationToken=${encodedToken}`;

    // Log the URL for debugging
    console.log("Generated verification URL:", verificationUrl)



      // Email content
  const mailOptions = {
    from: config.user_mail,
    to: email,
    subject: "Verify Your Email",
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h2>Email Verification</h2>
        <p>Thank you for registering. Please click the button below to verify your email address:</p>
        <a href="${verificationUrl}" style="display: inline-block; background-color: #4CAF50; color: white; padding: 10px 20px; text-decoration: none; border-radius: 4px; margin: 20px 0;">Verify Email</a>
        <p>If the button doesn't work, you can also copy and paste the following link into your browser:</p>
        <p style="word-break: break-all;">${verificationUrl}</p>
      </div>
    `,
  }




  const info = await transporter.sendMail(mailOptions)
  // ({
  //   from: 'Jahaji',
  //   to: email,
  //   subject: 'Verify Your Email',
  //   text: `Click the link to verify: ${verificationUrl}`,
  // });

  return info
};

// email validation
export const validateEmail = (email: string): boolean => emailValidator.validate(email);

