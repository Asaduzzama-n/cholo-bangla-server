import { Reservation } from '@prisma/client';
import prisma from '../../../shared/prisma';
import ApiError from '../../../errors/ApiError';
import httpStatus from 'http-status';
import {
  IGenericResponse,
  IPaginationOptions,
} from '../../../interfaces/common';
import { IWhereClause } from './reservation.interface';

const createReservation = async (
  data: Reservation,
): Promise<Reservation | null> => {
  const result = await prisma.reservation.create({ data: data });

  if (!result) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Failed to create reservation!');
  }

  return result;
};

const getReservations = async (
  options: IPaginationOptions,
): Promise<IGenericResponse<Reservation[]> | null> => {
  const { sortBy, sortOrder, searchTerm, limit, page } = options;
  const skip =
    parseInt(limit || '0') * parseInt(page || '1') - parseInt(limit || '0') ||
    0;
  const take = parseInt(limit || '20');

  const whereClause: IWhereClause = {};

  if (searchTerm) {
    whereClause.OR = [
      {
        event: {
          title: {
            contains: searchTerm,
            mode: 'insensitive',
          },
        },
      },
      {
        user: {
          firstName: {
            contains: searchTerm,
            mode: 'insensitive',
          },
        },
      },
    ];
  }

  return await prisma.$transaction(async tx => {
    const result = await tx.reservation.findMany({
      skip,
      take,
      include: {
        user: true,
        event: true,
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

const getSingleReservation = async (
  id: number,
): Promise<Reservation | null> => {
  const result = await prisma.reservation.findUnique({
    include: { user: true, event: true },
    where: { id },
  });
  if (!result) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Reservation does not exist!');
  }
  return result;
};

const deleteReservation = async (id: number): Promise<Reservation | null> => {
  const result = await prisma.reservation.delete({
    where: { id },
  });

  if (!result) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Failed to create reservation!');
  }

  return result;
};

export const ReservationServices = {
  createReservation,
  deleteReservation,
  getSingleReservation,
  getReservations,
};
