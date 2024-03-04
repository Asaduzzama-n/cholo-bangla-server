import { PrismaClient, User } from '@prisma/client';

const prisma = new PrismaClient();

const createUser = async (data: User): Promise<User> => {
  const result = await prisma.user.create({ data });
  return result;
};

const deleteUser = async (id: number): Promise<User> => {
  const result = await prisma.user.delete({ where: { id } });
  return result;
};
export const AuthService = {
  createUser,
  deleteUser,
};
