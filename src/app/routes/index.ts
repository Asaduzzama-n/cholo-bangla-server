import express from 'express';
import { authRoutes } from '../modules/auth/auth.route';
import { eventRoutes } from '../modules/event/event.route';
import { reservationRoutes } from '../modules/reservation/reservation.route';

const router = express.Router();

const moduleRoutes = [
  {
    path: '/auth',
    route: authRoutes,
  },
  {
    path: '/event',
    route: eventRoutes,
  },
  {
    path: '/reservation',
    route: reservationRoutes,
  },
];

moduleRoutes.forEach(route => router.use(route.path, route.route));

export default router;
