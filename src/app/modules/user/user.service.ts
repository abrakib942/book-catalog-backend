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

const getAUser = async (id: string): Promise<User | null> => {
  const result = await prisma.user.findUnique({
    where: {
      id,
    },
  });
  return result;
};

export const UserService = {
  signUp,
  getAllUsers,
  getAUser,
};
