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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateEmail = exports.sendVerificationEmail = exports.createToken = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const config_1 = __importDefault(require("../../config"));
const nodemailer_1 = __importDefault(require("nodemailer"));
const email_validator_1 = __importDefault(require("email-validator"));
// create token request
const createToken = (jwtPayload, secret, expiresIn) => {
    const signOptions = {
        expiresIn: expiresIn,
    };
    return jsonwebtoken_1.default.sign(jwtPayload, secret, signOptions);
};
exports.createToken = createToken;
// verification token
// export const generateVerificationToken = (email: string): string => {
//   const verificationToken = crypto.randomBytes(32).toString('hex');
//   return jwt.sign({ email }, verificationToken as string, { expiresIn: '1h' });
// };
// send verification email
const sendVerificationEmail = (email, token) => __awaiter(void 0, void 0, void 0, function* () {
    const transporter = nodemailer_1.default.createTransport({
        service: 'gmail',
        auth: { user: `${config_1.default.user_mail}`, pass: `${config_1.default.user_pass}` },
    });
    // Ensure token is properly encoded for URLs
    const encodedToken = encodeURIComponent(token);
    // const verificationUrl = `${config.frontend}/verify-email?token=${token}`;
    const verificationUrl = `${config_1.default.backend}/api/auth/verify-email?verificationToken=${encodedToken}`;
    // Log the URL for debugging
    console.log("Generated verification URL:", verificationUrl);
    // Email content
    const mailOptions = {
        from: config_1.default.user_mail,
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
    };
    const info = yield transporter.sendMail(mailOptions);
    // ({
    //   from: 'Jahaji',
    //   to: email,
    //   subject: 'Verify Your Email',
    //   text: `Click the link to verify: ${verificationUrl}`,
    // });
    return info;
});
exports.sendVerificationEmail = sendVerificationEmail;
// email validation
const validateEmail = (email) => email_validator_1.default.validate(email);
exports.validateEmail = validateEmail;
