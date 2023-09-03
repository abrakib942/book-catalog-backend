import { Category } from '@prisma/client';
import prisma from '../../../shared/prisma';

const createCategory = (categoryData: Category): Promise<Category> => {
  const result = prisma.category.create({
    data: categoryData,
  });

  return result;
};

export const CategoryService = {
  createCategory,
};
