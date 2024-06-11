import { PrismaClient, User } from '@prisma/client';
import ApiError from '../../../errors/ApiError';
import httpStatus from 'http-status';
import { IRefreshTokenResponse, IUserLoginResponse } from './auth.interface';
import { jwtHelpers } from '../../../helpers/jwt';
import config from '../../../config';
import { Secret } from 'jsonwebtoken';
import { passwordHelpers } from '../../../utils/password';

const prisma = new PrismaClient();

const createUser = async (data: User) => {
  const { email } = data;
  const isUserExist = await prisma.user.findUnique({ where: { email } });
  if (isUserExist) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'User already exists');
  }

  const hashedPassword = await passwordHelpers.hashPassword(data?.password);
  const userDataWithHashedPassword = {
    ...data,
    password: hashedPassword,
  };

  const createdUser = await prisma.user.create({
    data: userDataWithHashedPassword,
    select: { password: false },
  });

  if (!createdUser) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Failed to create user');
  }
  return createdUser;
};

const loginUser = async (
  email: string,
  password: string,
): Promise<IUserLoginResponse | null> => {
  const isUserExist = await prisma.user.findUnique({ where: { email } });
  if (!isUserExist) {
    throw new ApiError(httpStatus.NOT_FOUND, 'User does not exists!');
  }
  const passwordMatched = await passwordHelpers.isPasswordMatched(
    password,
    isUserExist.password,
  );
  if (!passwordMatched) {
    throw new ApiError(httpStatus.UNAUTHORIZED, 'Unauthorized Access!');
  }

  const accessToken = jwtHelpers.createToken(
    {
      email: isUserExist?.email,
      role: isUserExist?.role,
    },
    config.jwt.secret as Secret,
    config.jwt.expires_in as string,
  );

  const refreshToken = jwtHelpers.createToken(
    {
      email: isUserExist?.email,
      role: isUserExist?.role,
    },
    config.jwt.refresh_secret as Secret,
    config.jwt.refresh_expires_in as string,
  );

  const userData = await prisma.user.findUnique({ where: { email } });

  return {
    userData,
    accessToken,
    refreshToken,
  };
};

const getUser = async (bearerToken: string) => {
  let verifiedToken = null;
  console.log(bearerToken);
  try {
    verifiedToken = jwtHelpers.verifyToken(
      bearerToken,
      config.jwt.secret as Secret,
    );
  } catch (error) {
    throw new ApiError(httpStatus.FORBIDDEN, 'Invalid accessToken Token');
  }

  const { email } = verifiedToken;

  const userData = await prisma.user.findUnique({ where: { email } });

  return {
    userData,
  };
};

const deleteUser = async (id: number): Promise<User> => {
  const result = await prisma.user.delete({ where: { id } });
  return result;
};

const refreshToken = async (
  token: string,
): Promise<IRefreshTokenResponse | null> => {
  let verifiedToken = null;
  try {
    verifiedToken = jwtHelpers.verifyToken(
      token,
      config.jwt.refresh_secret as Secret,
    );
  } catch (error) {
    throw new ApiError(httpStatus.FORBIDDEN, 'Invalid Refresh Token');
  }

  const { email } = verifiedToken;

  const isUserExist = await prisma.user.findUnique({ where: { email } });
  if (!isUserExist) {
    throw new ApiError(httpStatus.NOT_FOUND, 'User does not exists!');
  }

  const newAccessToken = jwtHelpers.createToken(
    {
      email: isUserExist.email,
      role: isUserExist.role,
    },
    config.jwt.refresh_secret as Secret,
    config.jwt.refresh_expires_in as string,
  );

  return {
    accessToken: newAccessToken,
  };
};
export const AuthService = {
  createUser,
  loginUser,
  deleteUser,
  refreshToken,
  getUser,
};
