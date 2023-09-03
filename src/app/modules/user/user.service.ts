import { User } from '@prisma/client';
import prisma from '../../../shared/prisma';

const signUp = (userData: User): Promise<User> => {
  const result = prisma.user.create({
    data: userData,
  });

  return result;
};

const getAllUsers = async () => {
  const result = await prisma.user.findMany({});

  return result;
};

export const UserService = {
  signUp,
  getAllUsers,
};
