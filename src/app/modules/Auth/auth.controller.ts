import httpStatus from 'http-status';
import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import { AuthServices} from './auth.service';
import config from '../../config';
import { validateEmail } from './auth.utils';
import type { Request, Response, NextFunction } from "express"

// signup
const signUp = catchAsync(async (req, res) => {
  const { email } = req.body;
  if (!validateEmail(email)) {
    return sendResponse(res, {
      statusCode: httpStatus.BAD_REQUEST,
      success: false,
      message: 'Invalid email',
      data: null,
    });
  }
  const user = await AuthServices.createUserIntoDB(req.body);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'User registered successfully. Please check your email for verification.',
    data: user,
  });
});

// verify email
const verifyEmail =  catchAsync(async (req, res) => {
  const { email } = req.query;
  if (!email) {
    return sendResponse(res, {
      statusCode: httpStatus.BAD_REQUEST,
      success: false,
      message: 'Email is required',
      data: null,
    });
  }
  await AuthServices.verifyUserEmail(email as string);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Email verified successfully',
    data: null,
  });
});


// login
const loginUser = catchAsync(async (req, res) => {
  const result = await AuthServices.loginUser(req.body);
  const { refreshToken, accessToken, userWithoutPassword } = result;

  res.cookie('refreshToken', refreshToken, {
    secure: config.NODE_ENV === 'production',
    httpOnly: true,
  });

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'User is logged in succesfully!',
    token: accessToken,
    data: {
      userWithoutPassword,
    },
  });
});

// get all users
const getAllUsers = catchAsync(async (req, res) => {
  const result = await AuthServices.getAllUsersFromDB();

  // if no data found
  if (result.length == 0) {
    sendResponse(res, {
      statusCode: httpStatus.NOT_FOUND,
      success: false,
      message: 'No Data Found',
      data: [],
    });
  }
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Users retrieved successfully',
    data: result,
  });
});

// refreshToken
const refreshToken = catchAsync(async (req, res) => {
  const { refreshToken } = req.cookies;
  const result = await AuthServices.refreshToken(refreshToken);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Access token is retrieved succesfully!',
    data: result,
  });
});





export const AuthControllers = {
  signUp,
  verifyEmail,
  loginUser,
  getAllUsers,
  refreshToken,
};
