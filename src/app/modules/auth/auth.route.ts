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
router.post(
  '/login',
  validateRequest(AuthValidation.userLoginZodSchema),
  AuthController.loginUser,
);
router.post(
  '/refresh-token',
  validateRequest(AuthValidation.refreshTokenZodValidation),
  AuthController.refreshToken,
);
router.get('/user', AuthController.getUser);
router.delete('/:id', AuthController.deleteUser);

export const authRoutes = router;
