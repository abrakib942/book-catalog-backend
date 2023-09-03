import { Book } from '@prisma/client';
import prisma from '../../../shared/prisma';

const createBook = (bookData: Book): Promise<Book> => {
  const result = prisma.book.create({
    data: bookData,
    include: {
      category: true,
    },
  });

  return result;
};

const getAllBooks = async () => {
  const result = await prisma.book.findMany({
    include: {
      category: true,
    },
  });

  return result;
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
