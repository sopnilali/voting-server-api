

import express from 'express';
import { UserController } from './user.controller';
import { UserValidation } from './user.validation';
import validateRequest from '../../middleware/validateRequest';
import { UserRole } from '@prisma/client';
import auth from '../../middleware/auth';

const router = express.Router();

router.post("/", validateRequest(UserValidation.createUserZodSchema), UserController.createUser);
router.get("/", auth(UserRole.ADMIN), UserController.getAllUser);
router.patch("/:id", auth(UserRole.ADMIN), UserController.updateUser);
router.delete("/:id", auth(UserRole.ADMIN), UserController.deleteUser);

export const UserRoutes = router;