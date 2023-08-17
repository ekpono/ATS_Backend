import axios from 'axios';
import { paystackSecretKey } from '../config';
import { PaymentStatus } from '../enums/payment.enum';
import ApiError from '../middlewares/error/ApiError';
import PaymentModel from '../models/payment.model';
import { IPayment, IUpdatePayment } from '../types/payment.type';
import { message } from '../utils/helpers/sms';
import { validatePayment } from '../utils/validation/payment.validation';
import { findOne } from './candidate.service';
import { sendMessage } from './sms.service';

const paystack = axios.create({
  baseURL: 'https://api.paystack.co/',
  headers: {
    Authorization: `Bearer ${paystackSecretKey}`,
    'Content-Type': 'application/json',
  },
});

export const create = async (paymentDto: IPayment) => {
  const { error } = validatePayment(paymentDto);

  if (error) {
    throw new ApiError(400, error.message);
  }

  const candidate = await findOne(paymentDto.candidateId.toString());

  const paymentData = {
    email: candidate.email,
    amount: paymentDto.amount * 100,
  };

  const payment = await paystack.post('/transaction/initialize', paymentData);

  const { reference, authorization_url } = payment.data.data;

  paymentDto.reference = reference;
  await PaymentModel.create(paymentDto);

  const body = message(candidate.firstName, authorization_url, reference);
  const to = candidate.phone;
  const from = 'Acee Jobs';

  await sendMessage({ to, body, from });

  return { payment: payment.data.data, candidate };
};

export const update = async (reference: string) => {
  const payment = await PaymentModel.findOne({ reference });

  if (!payment) {
    throw new ApiError(404, 'payment not found');
  }

  await verify(reference);
  payment.status = PaymentStatus.PAID;

  await payment.save();

  return payment;
};

const verify = async (reference: string) => {
  const payment = await paystack.get(`/transaction/verify/${reference}`);

  if (payment?.data?.data?.status !== 'success') {
    throw new ApiError(403, 'No payment not made');
  }
};
