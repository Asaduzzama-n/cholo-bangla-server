import { z } from 'zod';
import { USER_ROLE } from '../../../enums/user';

const createUserZodSchema = z.object({
  body: z.object({
    firstName: z.string({ required_error: 'First Name is required!' }),
    lastName: z.string().optional(),
    email: z.string().email(),
    password: z.string().min(5, 'Password must contain minimum 5 character!'),
    profile: z.string().optional(),
    role: z.enum([...Object.values(USER_ROLE)] as [string, ...string[]], {
      required_error: 'User role is required!',
    }),
  }),
});

export const AuthValidation = {
  createUserZodSchema,
};
