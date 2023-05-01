import hotelRepository from '@/repositories/hotel-repository';
import enrollmentRepository from '@/repositories/enrollment-repository';
import { forbiddenError, notFoundError } from '@/errors';
import ticketsRepository from '@/repositories/tickets-repository';
import httpStatus from 'http-status';
import bookingRepository from '@/repositories/booking-repository';
import roomRepository from '@/repositories/room-repository';

async function getBookings(userId: number) {
  const bookings = await bookingRepository.findByUserId(userId);
  if (!bookings) {
    throw notFoundError();
  }
  return bookings;
}

async function makeAReservation(userId: number, roomId: number) {
  const enrollment = await enrollmentRepository.findByUserId(userId);
  if (!enrollment) {
    throw notFoundError();
  }
  const ticket = await ticketsRepository.findTicketByEnrollmentId(enrollment.id);
  console.log(ticket);
  if (!ticket || ticket.status === 'RESERVED' || ticket.TicketType.isRemote || !ticket.TicketType.includesHotel) {
    throw forbiddenError();
  }
  const room = await roomRepository.findById(roomId);
  if (!room) throw notFoundError();
  const reservations = await bookingRepository.findByRoomId(roomId);
  if (room.capacity <= reservations.length) throw forbiddenError();

  const booking = await bookingRepository.makeAReservation(userId, roomId);
  const response = { bookingId: booking.id };
  return response;
}

async function updateBoooking(userId: number, bookingId: number, roomId: number) {
  const userBooking = await bookingRepository.findByUserId(userId);
  if (!userBooking) throw forbiddenError();

  const booking = await bookingRepository.findById(bookingId);
  if (!booking) throw notFoundError();
  if (booking.id != userBooking.id) throw forbiddenError();

  const room = await roomRepository.findById(roomId);
  if (!room) throw notFoundError();

  const roomBookings = await bookingRepository.findByRoomId(roomId);
  if (room.capacity <= roomBookings.length) throw forbiddenError();

  return await bookingRepository.updateRoom(bookingId, roomId)
}

export default {
  getBookings,
  makeAReservation,
  updateBoooking,
};
