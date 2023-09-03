/* eslint-disable @typescript-eslint/no-explicit-any */
import { Order } from '@prisma/client';
import prisma from '../../../shared/prisma';

const createOrder = async (orderData: any): Promise<Order> => {
  const result = await prisma.order.create({
    data: orderData,
  });

  return result;
};

export const OrderService = {
  createOrder,
};
