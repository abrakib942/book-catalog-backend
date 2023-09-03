import express from 'express';
import { UserController } from './user.controller';

const router = express.Router();

router.post('/auth/signup', UserController.signUp);
router.get('/users', UserController.getAllUsers);
router.get('/users/:id', UserController.getAUser);

export const UserRoutes = router;
