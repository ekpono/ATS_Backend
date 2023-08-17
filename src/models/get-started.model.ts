import { Schema, model } from 'mongoose';
import { IGetStarted } from '../types/get-started.type';

const GetStartedSchema = new Schema<IGetStarted>(
  {
    firstName: {
      type: String,
    },

    lastName: {
      type: String,
    },

    email: {
      type: String,
      unique: true,
    },
    phone: {
      type: String,
    },
  },
  {
    timestamps: true,
  },
);

export default model('GetStarted', GetStartedSchema);
