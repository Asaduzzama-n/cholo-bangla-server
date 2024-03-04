import { z } from 'zod';

const eventCreateZodSchema = z.object({
  body: z.object({
    title: z.string({ required_error: 'Event Title is required!' }),
    description: z.string({ required_error: 'Event description is required!' }),
    fee: z.number({ required_error: 'Event fee is required!' }),
    startDate: z.string({ required_error: 'Event start date is required!' }),
    endDate: z.string({ required_error: 'Event end date is required!' }),
    image: z.string({ required_error: 'Event cover photo is required!' }),
    destinations: z.array(
      z.string({ required_error: 'Destinations is required!' }),
    ),
    capacity: z.number({ required_error: 'Event capacity is required!' }),
    organizerId: z.number({ required_error: 'Organizer id is required!' }),
  }),
});

export const EventValidation = {
  eventCreateZodSchema,
};
