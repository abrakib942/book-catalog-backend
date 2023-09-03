/* eslint-disable @typescript-eslint/no-explicit-any */
import { Order } from '@prisma/client';
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

export const OrderService = {
  createOrder,
  getAOrder,
};
