import bcrypt from 'bcrypt';
import config from '../config';

const isPasswordMatched = async (
  givenPassword: string,
  hashedPassword: string,
): Promise<boolean> => {
  return await bcrypt.compare(givenPassword, hashedPassword);
};

const hashPassword = async (password: string): Promise<string> => {
  return await bcrypt.hash(password, Number(config.bcrypt_salt_round));
};

export const passwordHelpers = {
  isPasswordMatched,
  hashPassword,
};
