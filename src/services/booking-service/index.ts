import hotelRepository from '@/repositories/hotel-repository';
import enrollmentRepository from '@/repositories/enrollment-repository';
import { notFoundError } from '@/errors';
import ticketsRepository from '@/repositories/tickets-repository';
import { cannotListHotelsError } from '@/errors/cannot-list-hotels-error';

async function getBookings(userId: number) {
  const bookings = await enrollmentRepository.findWithAddressByUserId(userId);
  if (!bookings) {
    throw notFoundError();
  }
  return bookings;
}

async function makeAReservation(userId: number, hotelId: number) {}

async function updateBoooking(userId: number, hotelId: number) {}

export default {
  getBookings,
  makeAReservation,
  updateBoooking,
};
