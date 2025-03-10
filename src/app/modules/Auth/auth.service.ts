import { User } from '../user/user.model';
import { TUser } from '../user/user.interface';
import { TLoginUser } from './auth.interface';
import AppError from '../../errors/AppError';
import httpStatus from 'http-status';
import config from '../../config';
import { createToken,  sendVerificationEmail } from './auth.utils';
import jwt, { JwtPayload } from 'jsonwebtoken';
import crypto from 'crypto';


// signup
const createUserIntoDB = async (userData: TUser) => {
  const jwtPayload = {
    email: userData.email,
    role: userData.role,
  };

  const verificationToken = createToken(
    jwtPayload,
    config.jwt_access_secret as string,
    config.jwt_access_expires_in as string,
  );;
  const user = await User.create({
    ...userData,
    verificationToken,  // Store the token in the database
    isVerified: false,  // User is not verified initially
  });;
  // const token = generateVerificationToken(user.email);
  await sendVerificationEmail(user.email, verificationToken);
  // console.log('from signin',user)
  return user;
};

// verification Email 
const verificationEmailService= async(token:string) =>{
  console.log("Verification attempt with token:", token)
    // Decode the token if it's URL encoded
    const decodedToken = decodeURIComponent(token)
    console.log("Decoded token:", decodedToken)
    
    

  let user = await User.findOne({ verificationToken: token })

  if (!user) {
    user = await User.findOne({ verificationToken: decodedToken })
    console.log("Found user with decoded token:", !!user)
  }
  
  console.log('from service',user)
  
  return user
}



// verify user email
const verifyUserEmail = async (email: string) => {
  const user = await User.findOne({ email });
  if (!user) throw new Error('User not found');
  user.isVerified = true;
  await user.save();
  console.log(' from verify',user)
  return user;
};


// login
const loginUser = async (payload: TLoginUser) => {
  // checking if the user is exist
  const user = await User.isUserExistsByEmail(payload.email);
  if (!user) {
    throw new AppError(httpStatus.NOT_FOUND, "User doesn't exist!");
  }
 // check if verified
  if (!user.isVerified) throw new Error('Please verify your email before logging in');

  //save data without password
  const userData = await User.findOne({ email: user.email });

  //checking if the password is correct
console.log("payload.password",payload?.password)
console.log("user.password", user?.password)

  if (!(await User.isPasswordMatched(payload?.password, user?.password)))
    throw new AppError(httpStatus.FORBIDDEN, 'Wrong Password');

  //create token and sent to the  client
  const jwtPayload = {
    email: user.email,
    role: user.role,
  };

  const accessToken = createToken(
    jwtPayload,
    config.jwt_access_secret as string,
    config.jwt_access_expires_in as string,
  );

  const refreshToken = createToken(
    jwtPayload,
    config.jwt_refresh_secret as string,
    config.jwt_refresh_expires_in as string,
  );

  return {
    userData,
    accessToken,
    refreshToken,
  };
};

// all users
const getAllUsersFromDB = async () => {
  const result = await User.find();
  return result;
};

// refresh token
const refreshToken = async (token: string) => {
  // checking if the given token is valid
  const decoded = jwt.verify(
    token,
    config.jwt_refresh_secret as string,
  ) as JwtPayload;

  const { email } = decoded;

  // checking if the user is exist
  const user = await User.isUserExistsByEmail(email);

  if (!user) {
    throw new AppError(httpStatus.NOT_FOUND, 'This user is not found !');
  }

  const jwtPayload = {
    email: user.email,
    role: user.role,
  };

  const accessToken = createToken(
    jwtPayload,
    config.jwt_access_secret as string,
    config.jwt_access_expires_in as string,
  );

  return {
    accessToken,
  };
};

export const AuthServices = {
  createUserIntoDB,
  verificationEmailService,
  verifyUserEmail,
  loginUser,
  getAllUsersFromDB,
  refreshToken,
};
