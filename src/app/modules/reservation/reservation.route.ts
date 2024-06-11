import express from 'express';
import validateRequest from '../../middlewares/validateRequest';
import { ReservationValidation } from './reservation.validation';
import { ReservationController } from './reservations.controller';

const router = express.Router();

router.post(
  '/',
  validateRequest(ReservationValidation.createReservationZodSchema),
  ReservationController.createReservation,
);

router.get('/:id', ReservationController.getSingleReservation);

router.delete('/:id', ReservationController.deleteReservation);

router.get('/', ReservationController.getReservations);

export const reservationRoutes = router;
