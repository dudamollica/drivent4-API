import httpStatus from 'http-status';
import { NextFunction, Response } from 'express';
import { AuthenticatedRequest } from '@/middlewares';
import bookingService from '@/services/booking-service';

export async function getBookings(req: AuthenticatedRequest, res: Response, next: NextFunction) {
  const { userId } = req;
  try {
    const bookings = await bookingService.getBookings(userId);
    return res.status(httpStatus.OK).send(bookings);
  } catch (error) {
    next(error);
  }
}

export async function makeAReservation(req: AuthenticatedRequest, res: Response, next: NextFunction) {
  const { userId } = req;
  const { roomId } = req.body;

  try {
    const bookingId = await bookingService.makeAReservation(userId, Number(roomId));
    return res.status(httpStatus.OK).send(bookingId);
  } catch (error) {
    next(error);
  }
}

export async function updateBoooking(req: AuthenticatedRequest, res: Response, next: NextFunction) {
  const { userId } = req;
  const bookingId = Number(req.params.bookingId);
  const { roomId } = req.body;

  try {
    await bookingService.updateBoooking(userId, bookingId, roomId);
    return res.status(httpStatus.OK).send({ bookingId: bookingId });
  } catch (error) {
    next(error);
  }
}
