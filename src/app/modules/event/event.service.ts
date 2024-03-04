import { Event } from '@prisma/client';
import prisma from '../../../shared/prisma';

const createEvent = async (data: Event): Promise<Event | null> => {
  const result = await prisma.event.create({ data });

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
  return result;
};

export const EventServices = {
  createEvent,
  updateEvent,
  deleteEvent,
};
