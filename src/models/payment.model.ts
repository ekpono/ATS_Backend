import mongoose, { Schema, model } from 'mongoose';
import { PaymentStatus } from '../enums/payment.enum';
import { IPayment } from '../types/payment.type';

const PaymentSchema = new Schema<IPayment>(
  {
    candidateId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Candidate',
    },
    amount: {
      type: Number,
    },
    status: {
      type: String,
      default: PaymentStatus.PENDING,
    },
    reference: {
      type: String,
    },
  },
  { timestamps: true },
);

export default model('Payment', PaymentSchema);
