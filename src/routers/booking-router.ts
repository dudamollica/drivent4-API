import { Router } from 'express';
import { authenticateToken } from '@/middlewares';
import { getBookings, makeAReservation, updateBoooking} from '@/controllers/booking-controller';

const bookingRouter = Router();

bookingRouter.all('/*', authenticateToken)
.get('/', getBookings)
.post('/', makeAReservation)
.put('/:bookingId', updateBoooking);

export { bookingRouter };