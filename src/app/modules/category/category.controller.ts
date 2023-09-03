import { Request, Response } from 'express';
import httpStatus from 'http-status';
import catchAsync from '../../../shared/catchAsync';
import sendResponse from '../../../shared/sendResponse';
import { CategoryService } from './category.service';

const createCategory = catchAsync(async (req: Request, res: Response) => {
  const result = await CategoryService.createCategory(req.body);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'category created successfully',
    data: result,
  });
});
const getAllCategories = catchAsync(async (req: Request, res: Response) => {
  const result = await CategoryService.getAllCategories();

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'categories retrieved successfully',
    data: result,
  });
});
const getACategory = catchAsync(async (req: Request, res: Response) => {
  const result = await CategoryService.getACategory(req.params.id);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'category retrieved successfully',
    data: result,
  });
});

export const CategoryController = {
  createCategory,
  getAllCategories,
  getACategory,
};
