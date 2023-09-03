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

export const CategoryService = {
  createCategory,
  getAllCategories,
};
