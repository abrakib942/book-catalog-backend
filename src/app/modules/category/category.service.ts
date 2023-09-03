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

const updateCategory = async (
  id: string,
  payload: Partial<Category>
): Promise<Category> => {
  const result = await prisma.category.update({
    where: {
      id,
    },
    data: payload,
  });
  return result;
};

const deleteCategory = async (id: string): Promise<Category> => {
  const result = await prisma.category.delete({
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
  updateCategory,
  deleteCategory,
};
