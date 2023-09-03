"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.BookService = void 0;
const paginationHelper_1 = require("../../../helpers/paginationHelper");
const prisma_1 = __importDefault(require("../../../shared/prisma"));
const createBook = (bookData) => {
    const result = prisma_1.default.book.create({
        data: bookData,
        include: {
            category: true,
        },
    });
    return result;
};
const getAllBooks = (filters, options) => __awaiter(void 0, void 0, void 0, function* () {
    const searchableFields = ['title', 'author', 'genre'];
    const { page, limit, skip } = paginationHelper_1.paginationHelpers.calculatePagination(options);
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
    const whereConditions = andConditons.length > 0 ? { AND: andConditons } : {};
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
    const result = yield prisma_1.default.book.findMany({
        include: {
            category: true,
        },
        where: whereConditions,
        skip,
        take: limit,
    });
    const total = yield prisma_1.default.book.count();
    return {
        meta: {
            total,
            page,
            limit,
        },
        data: result,
    };
});
const getABook = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield prisma_1.default.book.findUnique({
        where: {
            id,
        },
        include: {
            category: true,
        },
    });
    return result;
});
const updateBook = (id, payload) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield prisma_1.default.book.update({
        where: {
            id,
        },
        data: payload,
        include: {
            category: true,
        },
    });
    return result;
});
const deleteBook = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield prisma_1.default.book.delete({
        where: {
            id,
        },
        include: {
            category: true,
        },
    });
    return result;
});
const getBooksByCategoryId = (categoryId) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield prisma_1.default.book.findMany({
        where: {
            categoryId: categoryId,
        },
        include: {
            category: true,
        },
    });
    return result;
});
exports.BookService = {
    createBook,
    getAllBooks,
    getABook,
    updateBook,
    deleteBook,
    getBooksByCategoryId,
};
