import mongoose, { model, Schema } from 'mongoose';
import { IJob } from '../types/job.type';

const JobSchema = new Schema<IJob>(
  {
    title: {
      type: String,
    },
    company: {
      type: String,
    },
    description: {
      type: String,
    },

    responsibility: {
      type: String,
    },

    requirement: {
      type: String,
    },
    qualification: {
      type: String,
    },
    experience: {
      type: Number,
    },
    salary: {
      type: String,
    },
    jobType: {
      type: String,
    },
    location: {
      type: String,
    },

    isAvailable: {
      type: Boolean,
      default: true,
    },

    hiringManager: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
    },
  },

  { timestamps: true },
);

export default model('Job', JobSchema);
