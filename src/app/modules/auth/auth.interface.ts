import { User } from '@prisma/client';

export type IUserLoginResponse = {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  userData: User | null;
  accessToken: string;
  refreshToken?: string;
};

export type IRefreshTokenResponse = {
  accessToken: string;
};
