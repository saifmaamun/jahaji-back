/* eslint-disable no-unused-vars */
import { Model, Types } from 'mongoose';
import { USER_ROLE } from './user.constant';

// user type
export interface TUser {
  _id: Types.ObjectId
  googleId: string
  displayName: string
  firstName?: string
  lastName?: string
  profilePhoto?: string
  createdAt: Date
  lastLogin?: Date
  email: string;
  password: string;
  phone: string;
  role: 'admin' | 'user';
  address: string;
  isVerified: boolean;
}

// authentications and autoraization
export interface UserModel extends Model<TUser> {
  //instance methods for checking if the user exist
  isUserExistsByEmail(email: string): Promise<TUser>;
  //instance methods for checking if passwords are matched
  isPasswordMatched(
    plainTextPassword: string,
    hashedPassword: string,
  ): Promise<boolean>;
  isJWTIssuedBeforePasswordChanged(
    passwordChangedTimestamp: Date,
    jwtIssuedTimestamp: number,
  ): boolean;
}

export type TUserRole = keyof typeof USER_ROLE;
