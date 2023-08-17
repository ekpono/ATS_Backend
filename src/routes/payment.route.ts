import { Router } from 'express';
import {
  createPayment,
  confirmPayment,
} from '../controllers/payment.controller';

const paymentRouter = Router();

paymentRouter.route('/').post(createPayment);
paymentRouter.route('/:id').patch(confirmPayment);

export default paymentRouter;
