import { Request, Response } from 'express';
import catchAsync from '../../../shared/catchAsync';
import { ReservationServices } from './reservation.service';
import sendResponse from '../../../shared/sendResponse';
import httpStatus from 'http-status';

const createReservation = catchAsync(async (req: Request, res: Response) => {
  const reservation = req.body;

  const result = await ReservationServices.createReservation(reservation);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Reservation created successfully!',
    data: result,
  });
});

const getSingleReservation = catchAsync(async (req: Request, res: Response) => {
  const id = parseInt(req.params.id);

  const result = await ReservationServices.getSingleReservation(id);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Reservation deleted successfully!',
    data: result,
  });
});

const getReservations = catchAsync(async (req: Request, res: Response) => {
  const options = req.query;
  const result = await ReservationServices.getReservations(options);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Reservation retrieved successfully!',
    data: result,
  });
});

const deleteReservation = catchAsync(async (req: Request, res: Response) => {
  const id = parseInt(req.params.id);

  const result = await ReservationServices.deleteReservation(id);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Reservation deleted successfully!',
    data: result,
  });
});

export const ReservationController = {
  createReservation,
  deleteReservation,
  getSingleReservation,
  getReservations,
};
