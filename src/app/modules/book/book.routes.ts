import express from 'express';
import { ENUM_USER_ROLE } from '../../../enums/user';
import auth from '../../middlewares/auth';
import { BookController } from './book.controller';

const router = express.Router();

router.post('/create-book', BookController.createBook);
router.get('/', BookController.getAllBooks);
router.get('/:id', BookController.getABook);
router.get('/:categoryId', BookController.getBooksByCategoryId);

router.patch('/:id', BookController.updateBook);
router.delete('/:id', auth(ENUM_USER_ROLE.ADMIN), BookController.deleteBook);

export const BookRoutes = router;
