import express from 'express';
import validateRequest from '../../middlewares/validateRequest';
import { EventValidation } from './event.validation';
import { EventController } from './event.controller';
const router = express.Router();

router.post(
  '/',
  validateRequest(EventValidation.eventCreateZodSchema),
  EventController.createEvent,
);
router.patch('/:id', EventController.updateEvent);
router.delete('/:id', EventController.deleteEvent);
router.get('/:id', EventController.getSingleEvent);
router.get('/', EventController.getEvents);

export const eventRoutes = router;
