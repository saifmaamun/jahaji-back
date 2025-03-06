/* eslint-disable @typescript-eslint/no-this-alias */
import bcrypt from 'bcrypt';
import { Schema, Types, model } from 'mongoose';
import config from '../../config';
import { TUser, UserModel } from './user.interface';

// user Schema
const userSchema = new Schema<TUser, UserModel>({
  // _id: { type: Types.ObjectId, auto: true }, // Auto-generate ObjectId
  googleId: { type: String, required: true, unique: true },
  displayName: { type: String, required: true },
  firstName: { type: String },
  lastName: { type: String },
  profilePhoto: { type: String },
  createdAt: { type: Date, default: Date.now },
  lastLogin: { type: Date },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  phone: { type: String, required: true },
  role: { type: String, enum: ['admin', 'user'], default: 'user' },
  address: { type: String, required: true },
  isVerified: { type: Boolean, default: false },
});

// securing password
userSchema.pre('save', async function (next) {
  // eslint-disable-next-line @typescript-eslint/no-this-alias
  const user = this; // doc
  // hashing password and save into DB

  user.password = await bcrypt.hash(
    user.password,
    Number(config.bcrypt_salt_rounds),
  );

  next();
});

// set '' after saving password
userSchema.post('save', function (doc, next) {
  doc.password = '';
  next();
});

// static method for checking user exists
userSchema.statics.isUserExistsByEmail = async function (email: string) {
  return await User.findOne({ email }).select('+password');
};

// password matching
userSchema.statics.isPasswordMatched = async function (
  plainTextPassword,
  hashedPassword,
) {
  return await bcrypt.compare(plainTextPassword, hashedPassword);
};

export const User = model<TUser, UserModel>('User', userSchema);
