import { User } from '@prisma/client';
import prisma from '../../../shared/prisma';

const signUp = (userData: User): Promise<User> => {
  const result = prisma.user.create({
    data: userData,
  });

  return result;
};

const getAllUsers = async () => {
  const result = await prisma.user.findMany({
    include: {
      orders: true,
      reviewAndRatings: true,
    },
  });

  return result;
};

const getAUser = async (id: string): Promise<User | null> => {
  const result = await prisma.user.findUnique({
    where: {
      id,
    },
    include: {
      orders: true,
      reviewAndRatings: true,
    },
  });
  return result;
};

const updateUser = async (
  id: string,
  payload: Partial<User>
): Promise<User> => {
  const result = await prisma.user.update({
    where: {
      id,
    },
    data: payload,
  });
  return result;
};
const deleteUser = async (id: string): Promise<User> => {
  const result = await prisma.user.delete({
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
  updateUser,
  deleteUser,
};
