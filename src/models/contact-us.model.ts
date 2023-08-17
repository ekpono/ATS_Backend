import { Schema, model } from 'mongoose';
import { IContact } from '../types/contact-us.type';

const ContactSchema = new Schema<IContact>(
  {
    name: {
      type: String,
    },
    phone: {
      type: String,
    },
    email: {
      type: String,
    },
    message: {
      type: String,
    },
  },
  { timestamps: true },
);

export default model('Contact', ContactSchema);
