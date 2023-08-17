import mongoose from 'mongoose';
import { PaymentStatus } from '../enums/payment.enum';

export interface IPayment {
  amount: number;
  candidateId: mongoose.Schema.Types.ObjectId;
  status: PaymentStatus;
  reference: string;
}

export interface IUpdatePayment {
  status: PaymentStatus;
}
