import { Category } from '@prisma/client';
import prisma from '../../../shared/prisma';

const createCategory = (categoryData: Category): Promise<Category> => {
  const result = prisma.category.create({
    data: categoryData,
  });

  return result;
};

const getAllCategories = async () => {
  const result = await prisma.category.findMany({});

  return result;
};

const getACategory = async (id: string): Promise<Category | null> => {
  const result = await prisma.category.findUnique({
    where: {
      id,
    },
  });
  return result;
};

export const CategoryService = {
  createCategory,
  getAllCategories,
  getACategory,
};
