import { PrismaClient, User } from '@prisma/client';

const signUp = (userData: User): Promise<User> => {
  const prisma = new PrismaClient();

  const result = prisma.user.create({
    data: userData,
  });

  return result;
};

export const UserService = {
  signUp,
};
