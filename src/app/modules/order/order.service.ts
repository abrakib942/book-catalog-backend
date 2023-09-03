/* eslint-disable @typescript-eslint/no-explicit-any */
import { Order } from '@prisma/client';
import httpStatus from 'http-status';
import ApiError from '../../../errors/ApiError';
import prisma from '../../../shared/prisma';

const createOrder = async (orderData: any): Promise<Order> => {
  const result = await prisma.order.create({
    data: orderData,
  });

  return result;
};

const getAOrder = async (id: string) => {
  const result = await prisma.order.findUnique({
    where: {
      id,
    },
  });
  return result;
};

const getSingleOrder = async (token: any): Promise<Order | null> => {
  const { role, userId } = token;

  let result: any;
  if (role && role === 'admin') {
    result = await prisma.order.findMany({
      include: {
        orderedBooks: {
          include: {
            book: true,
          },
        },
      },
    });
  } else if (role && role === 'customer') {
    result = await prisma.order.findMany({
      where: {
        userId: {
          equals: userId,
        },
      },
      include: {
        orderedBooks: {
          include: {
            book: true,
          },
        },
      },
    });
  }
  if (!result || result.length === 0) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Order not found');
  }
  return result;
};

// bonus part get specific order
const getspecificOrder = async (
  id: string,
  token: any
): Promise<Order | null> => {
  const { role, userId } = token;

  let result: any;
  if (role && role === 'admin') {
    result = await prisma.order.findMany({
      where: {
        id,
      },
    });
  } else if (role && role === 'customer') {
    result = await prisma.order.findMany({
      where: {
        id,
        userId: {
          equals: userId,
        },
      },
    });
  }
  if (!result || result.length === 0) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Order not found');
  }
  return result;
};

export const OrderService = {
  createOrder,
  getAOrder,
  getspecificOrder,
  getSingleOrder,
};
