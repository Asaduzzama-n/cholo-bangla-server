import { Request, Response } from 'express';
import catchAsync from '../../../shared/catchAsync';
import { EventServices } from './event.service';
import sendResponse from '../../../shared/sendResponse';
import httpStatus from 'http-status';

const createEvent = catchAsync(async (req: Request, res: Response) => {
  const result = await EventServices.createEvent(req.body);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Event created successful!',
    data: result,
  });
});

const updateEvent = catchAsync(async (req: Request, res: Response) => {
  const id = parseInt(req.params.id);
  const result = await EventServices.updateEvent(id, req.body);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Event update successful!',
    data: result,
  });
});

const deleteEvent = catchAsync(async (req: Request, res: Response) => {
  const id = parseInt(req.params.id);
  const result = await EventServices.deleteEvent(id);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Event deletion successful!',
    data: result,
  });
});

export const EventController = {
  createEvent,
  updateEvent,
  deleteEvent,
};
