

import express from 'express';
import { AuthController } from './auth.controller';
import auth from '../../middleware/auth';
import { UserRole } from '@prisma/client';

const router = express.Router();

router.post("/login", AuthController.loginUser);
router.post("/refresh-token", auth(UserRole.USER, UserRole.ADMIN), AuthController.refreshToken);


export const AuthRoutes = router;