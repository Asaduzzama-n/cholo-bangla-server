import { Request, Response } from 'express';
import { AuthService } from './auth.service';
import catchAsync from '../../../shared/catchAsync';
import sendResponse from '../../../shared/sendResponse';
import httpStatus from 'http-status';
import { IRefreshTokenResponse, IUserLoginResponse } from './auth.interface';
import config from '../../../config';

const createUser = catchAsync(async (req: Request, res: Response) => {
  const result = await AuthService.createUser(req.body);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Account created successfully!',
    data: result,
  });
});

const loginUser = catchAsync(async (req: Request, res: Response) => {
  const { email, password } = req.body;
  const result = await AuthService.loginUser(email, password);

  const { refreshToken, ...others } = result;

  const cookieOptions = {
    secure: config.env === 'production' ? true : false,
    httpOnly: true,
  };

  res.cookie('refreshToken', refreshToken, cookieOptions);

  sendResponse<IUserLoginResponse>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'User login successfully!',
    data: others,
  });
});

const getUser = catchAsync(async (req: Request, res: Response) => {
  const authHeader = req.headers['authorization'];
  // const token = authHeader!.split(' ')[1];
  // console.log(authHeader, 'jjjjjjjjjjjjjjjjjjjjjjj');
  const result = await AuthService.getUser(authHeader as string);

  const cookieOptions = {
    secure: config.env === 'production' ? true : false,
    httpOnly: true,
  };

  res.cookie('refreshToken', refreshToken, cookieOptions);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'User retrieved successfully!',
    data: result,
  });
});

const deleteUser = catchAsync(async (req: Request, res: Response) => {
  const id = parseInt(req.params.id);
  const result = await AuthService.deleteUser(id);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'User deleted successfully!',
    data: result,
  });
});

const refreshToken = catchAsync(async (req: Request, res: Response) => {
  const { refreshToken } = req.cookies;
  console.log(refreshToken);

  const result = await AuthService.refreshToken(refreshToken);

  sendResponse<IRefreshTokenResponse>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Refresh token fetched successfully!',
    data: result,
  });
});

export const AuthController = {
  createUser,
  deleteUser,
  loginUser,
  refreshToken,
  getUser,
};
