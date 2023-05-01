import { prisma } from '@/config';

async function findById(id: number) {
  return prisma.booking.findFirst({ where: { id } });
}

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

async function updateRoom(id:number, newRoom: number) {
  return prisma.booking.update({where:{id}, data:{roomId:newRoom}})
}

const hotelRepository = {
  findByUserId,
  findByRoomId,
  makeAReservation,
  findById,
  updateRoom
};

export default hotelRepository;
