import {
  IGenericResponse,
  IPaginationOptions,
} from './../../../interfaces/common';
import { Event } from '@prisma/client';
import prisma from '../../../shared/prisma';
import { IWhereClause } from './event.interface';
import ApiError from '../../../errors/ApiError';
import httpStatus from 'http-status';

const createEvent = async (data: Event): Promise<Event | null> => {
  const result = await prisma.event.create({ data });

  return result;
};

const getEvents = async (
  options: IPaginationOptions,
): Promise<IGenericResponse<Event[]> | null> => {
  const { sortBy, sortOrder, searchTerm, limit, page } = options;
  const skip =
    parseInt(limit || '0') * parseInt(page || '1') - parseInt(limit || '0') ||
    0;
  const take = parseInt(limit || '20');

  const whereClause: IWhereClause = {};

  if (searchTerm) {
    whereClause.OR = [
      {
        title: {
          contains: searchTerm,
          mode: 'insensitive',
        },
      },
      {
        destinations: {
          has: searchTerm,
        },
      },
      {
        organizer: {
          firstName: {
            contains: searchTerm,
            mode: 'insensitive',
          },
        },
      },
    ];
  }

  return await prisma.$transaction(async tx => {
    const result = await tx.event.findMany({
      skip,
      take,
      include: {
        organizer: true,
        reservations: true,
      },
      orderBy:
        sortBy && sortOrder ? { [sortBy]: sortOrder } : { createdAt: 'desc' },
      where: whereClause,
    });

    const total = result.length;

    return {
      meta: {
        total,
        page: parseInt(page ?? '1'),
        limit: parseInt(limit || '20'),
      },
      data: result,
    };
  });
};

const getSingleEvent = async (id: number): Promise<Event | null> => {
  const result = await prisma.event.findUnique({
    include: { organizer: true, reservations: true },
    where: { id },
  });
  if (!result) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Event not found!');
  }
  return result;
};

const updateEvent = async (
  id: number,
  payload: Partial<Event>,
): Promise<Event | null> => {
  const result = await prisma.event.update({ where: { id }, data: payload });

  return result;
};

const deleteEvent = async (id: number): Promise<Event> => {
  const result = await prisma.event.delete({ where: { id } });
  if (!result) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Failed to create reservation!');
  }
  return result;
};

export const EventServices = {
  createEvent,
  getEvents,
  getSingleEvent,
  updateEvent,
  deleteEvent,
};
