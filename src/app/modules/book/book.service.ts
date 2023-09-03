/* eslint-disable @typescript-eslint/no-explicit-any */
import { Book, Prisma } from '@prisma/client';
import { paginationHelpers } from '../../../helpers/paginationHelper';
import { IPaginationOptions } from '../../../interfaces/pagination';
import prisma from '../../../shared/prisma';

export type IBookFilterRequest = {
  searchTerm?: string;
  minPrice?: number;
  maxPrice?: number;
  category?: string;
};

const createBook = (bookData: Book): Promise<Book> => {
  const result = prisma.book.create({
    data: bookData,
    include: {
      category: true,
    },
  });

  return result;
};

const getAllBooks = async (filters: any, options: IPaginationOptions) => {
  const searchableFields = ['title', 'author', 'genre'];

  const { page, limit, skip } = paginationHelpers.calculatePagination(options);
  const { searchTerm, minPrice, maxPrice, category } = filters;
  const andConditons = [];

  if (searchTerm) {
    andConditons.push({
      OR: searchableFields.map(field => ({
        [field]: {
          contains: searchTerm,
          mode: 'insensitive',
        },
      })),
    });
  }

  const whereConditions: Prisma.BookWhereInput =
    andConditons.length > 0 ? { AND: andConditons } : {};

  if (minPrice) {
    whereConditions.price = {
      gte: parseFloat(minPrice),
    };
  }

  if (maxPrice) {
    if (!whereConditions.price) {
      whereConditions.price = {};
    }
    whereConditions.price = { lte: parseFloat(maxPrice) };
  }

  if (category) {
    whereConditions.categoryId = category;
  }

  const result = await prisma.book.findMany({
    include: {
      category: true,
    },
    where: whereConditions,
    skip,
    take: limit,
  });

  const total = await prisma.book.count();

  return {
    meta: {
      total,
      page,
      limit,
    },
    data: result,
  };
};

const getABook = async (id: string): Promise<Book | null> => {
  const result = await prisma.book.findUnique({
    where: {
      id,
    },
    include: {
      category: true,
    },
  });
  return result;
};

const updateBook = async (
  id: string,
  payload: Partial<Book>
): Promise<Book> => {
  const result = await prisma.book.update({
    where: {
      id,
    },
    data: payload,
    include: {
      category: true,
    },
  });
  return result;
};

const deleteBook = async (id: string): Promise<Book> => {
  const result = await prisma.book.delete({
    where: {
      id,
    },
    include: {
      category: true,
    },
  });
  return result;
};

export const BookService = {
  createBook,
  getAllBooks,
  getABook,
  updateBook,
  deleteBook,
};
