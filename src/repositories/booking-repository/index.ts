import { prisma } from '@/config';

async function findByUserId(userId: number) {
  return prisma.booking.findFirst({
    where: {
      userId,
    },
    select: {
      id: true,
      Room: true,
    },
  });
}

async function findByRoomId(roomId: number) {
  return prisma.booking.findMany({ where: { roomId } });
}

async function makeAReservation(userId: number, roomId: number) {
  return prisma.booking.create({ data: { userId, roomId } });
}

const hotelRepository = {
  findByUserId,
  findByRoomId,
  makeAReservation,
};

export default hotelRepository;
