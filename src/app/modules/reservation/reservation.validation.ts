import { z } from 'zod';

const createReservationZodSchema = z.object({
  body: z.object({
    userId: z.number({ required_error: 'User id is required!' }),
    eventId: z.number({ required_error: 'Event id is required!' }),
  }),
});

export const ReservationValidation = {
  createReservationZodSchema,
};
