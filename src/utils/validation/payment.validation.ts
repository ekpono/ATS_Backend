import Joi from 'joi';
import { PaymentStatus } from '../../enums/payment.enum';

export const validatePayment = (Payment: any) => {
  const paymentSchema = Joi.object({
    candidateId: Joi.string().required(),
    amount: Joi.number(),
  });

  return paymentSchema.validate(Payment);
};

// export const validateUpdatePayment = (Payment: any) => {
//   const paymentSchema = Joi.object({
//     status: Joi.string().allow(PaymentStatus).required(),
//   });

//   return paymentSchema.validate(Payment);
// };
