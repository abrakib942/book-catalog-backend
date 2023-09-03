import express from 'express';
import { UserController } from './user.controller';

const router = express.Router();

router.post('/auth/signup', UserController.signUp);
router.get('/users', UserController.getAllUsers);

export const UserRoutes = router;
