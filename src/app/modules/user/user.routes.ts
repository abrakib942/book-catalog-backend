import express from 'express';
import { UserController } from './user.controller';

const router = express.Router();

router.post('/auth/signup', UserController.signUp);
router.get('/users', UserController.getAllUsers);
router.get('/users/:id', UserController.getAUser);

router.patch('/users/:id', UserController.updateUser);

export const UserRoutes = router;
