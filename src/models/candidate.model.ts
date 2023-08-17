import mongoose, { Schema, model } from 'mongoose';
import {
  JobStatus,
  ProfileMode,
  ProfileStatus,
  VerificationStatus,
} from '../enums/candidate.enum';
import { ICandidate } from '../types/candidate.type';

const CandidateSchema = new Schema<ICandidate>(
  {
    firstName: {
      type: String,
    },
    lastName: {
      type: String,
    },
    email: {
      type: String,
    },
    phone: {
      type: String,
    },
    dateOfBirth: {
      type: String,
    },
    gender: {
      type: String,
    },
    profession: {
      type: String,
    },
    street: {
      type: String,
    },
    state: {
      type: String,
    },

    city: {
      type: String,
    },
    country: {
      type: String,
    },
    jobStatus: {
      type: String,
      default: JobStatus.AVAILABLE,
    },
    hiredAt: {
      type: Date,
    },
    experience: {
      type: String,
    },
    verificationStatus: {
      type: String,
      default: VerificationStatus.IN_PROGRESS,
    },

    profileStatus: {
      type: String,
      default: ProfileStatus.IN_COMPLETE,
    },
    salary: {
      type: String,
    },

    qualification: {
      type: String,
    },
    profileImage: {
      type: String,
    },

    resume: {
      type: String,
    },

    identification: {
      type: String,
    },
    nextOfKinFirstName: {
      type: String,
    },
    nextOfKinLastName: {
      type: String,
    },
    nextOfKinPhone: {
      type: String,
    },
    nextOfKinStreet: {
      type: String,
    },
    nextOfKinState: {
      type: String,
    },
    nextOfKinCity: {
      type: String,
    },
    nextOfKinCountry: {
      type: String,
    },
    nextOfKinRelationship: {
      type: String,
    },
    staffId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
    },

    profileMode: {
      type: String,
      default: ProfileMode.INACTIVE,
    },

    isArchive: {
      type: Boolean,
      default: false,
    },
    name: {
      type: String,
    },
  },
  {
    timestamps: true,
  },
);

export default model('Candidate', CandidateSchema);
