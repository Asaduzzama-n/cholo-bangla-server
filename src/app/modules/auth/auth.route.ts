import express from 'express';
import { AuthController } from './auth.controller';
import validateRequest from '../../middlewares/validateRequest';
import { AuthValidation } from './auth.validation';

const router = express.Router();

router.post(
  '/sign-up',
  validateRequest(AuthValidation.createUserZodSchema),
  AuthController.createUser,
);
router.delete('/:id', AuthController.deleteUser);

export const authRoutes = router;
