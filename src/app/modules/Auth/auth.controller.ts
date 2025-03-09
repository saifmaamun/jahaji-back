import httpStatus from 'http-status';
import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import { AuthServices} from './auth.service';
import config from '../../config';
import { validateEmail } from './auth.utils';


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
  console.log('Received verification request:', req.query);
  const token = req.query.verificationToken as string;
  

  

  // Find user by token
  if (!token) {
    console.log("Verification failed: Missing token")
    return res.redirect(`${config.frontend}/verification-failed?reason=missing-token`)
  }
  
  
  
  const user = await AuthServices.verifyEmailService(token);
  console.log("from controller",user)


  if (!user) {
    console.log("Verification failed: Invalid token")
    return res.redirect(`${config.frontend}/verification-failed?reason=invalid-token`)
  }

  // Mark user as verified
  user.isVerified = true;
  user.verificationToken = null; // Clear the token after verification
  await user.save();
  console.log("User verified successfully")
  return res.redirect(`${config.frontend}/verification-success`);


 
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
