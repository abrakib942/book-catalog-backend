import { Request, Response } from 'express';
import httpStatus from 'http-status';
import catchAsync from '../../../shared/catchAsync';
import prisma from '../../../shared/prisma';
import sendResponse from '../../../shared/sendResponse';
import { OrderService } from './order.service';

const createOrder = catchAsync(async (req: Request, res: Response) => {
  const result = await OrderService.createOrder(req.body);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'order created successfully',
    data: result,
  });
});

const getAllOrders = catchAsync(async (req: Request, res: Response) => {
  const result = await prisma.order.findMany({});

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'order retrieved successfully',
    data: result,
  });
});

const getAOrder = catchAsync(async (req: Request, res: Response) => {
  const result = await OrderService.getAOrder(req.params.id);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'order retrieved successfully',
    data: result,
  });
});

export const OrderController = {
  createOrder,
  getAllOrders,
  getAOrder,
};
