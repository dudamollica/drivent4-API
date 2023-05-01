import { prisma } from '@/config';

async function getBookings(userId: number) {
  return prisma.booking.findMany({
    where: {
      userId,
    },
    select: {
      id: true,
      Room: true,
    },
  });
}

async function makeAReservation(hotelId: number) {
}

const hotelRepository = {
  getBookings,
  makeAReservation,
};

export default hotelRepository;
