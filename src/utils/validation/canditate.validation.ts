import Joi from 'joi';
import { emailRegex, phoneNumberRegex } from '.';
import {
  Gender,
  JobStatus,
  ProfileMode,
  VerificationStatus,
} from '../../enums/candidate.enum';
export const validateCandidate = (candidate: any) => {
  const candidateSchema = Joi.object({
    firstName: Joi.string().required(),
    lastName: Joi.string().required(),
    email: Joi.string().pattern(emailRegex).email().required(),
    phone: Joi.string().pattern(phoneNumberRegex).required(),
    profession: Joi.string().required(),
    dateOfBirth: Joi.string().required(),
    street: Joi.string().required(),
    state: Joi.string().required(),
    city: Joi.string().required(),
    country: Joi.string().required(),
    gender: Joi.string().valid(Gender.MALE, Gender.FEMALE).required(),
    jobStatus: Joi.string().valid(
      JobStatus.AVAILABLE,
      JobStatus.HIRED,
      JobStatus.INTERVIEW,
    ),
    experience: Joi.string().required(),
    verificationStatus: Joi.string().valid(
      VerificationStatus.IN_PROGRESS,
      VerificationStatus.NOT_VERIFIED,
      VerificationStatus.VERIFIED,
    ),
    profileMode: Joi.string().valid(ProfileMode.ACTIVE, ProfileMode.INACTIVE),
    salary: Joi.number().required(),
    profileImage: Joi.string(),
    qualification: Joi.string(),
    resume: Joi.string(),
    identification: Joi.string(),
    nextOfKinFirstName: Joi.string().required(),
    nextOfKinLastName: Joi.string().required(),
    nextOfKinPhone: Joi.string().required(),
    nextOfKinStreet: Joi.string().required(),
    nextOfKinState: Joi.string().required(),
    nextOfKinCity: Joi.string().required(),
    nextOfKinCountry: Joi.string().required(),
    nextOfKinRelationship: Joi.string().optional(),
  });

  return candidateSchema.validate(candidate);
};

export const validateUpdateCandidate = (candidate: any) => {
  const candidateSchema = Joi.object({
    firstName: Joi.string().optional(),
    lastName: Joi.string().optional(),
    phone: Joi.string().optional(),
    profession: Joi.string().optional(),
    dateOfBirth: Joi.string().optional(),
    street: Joi.string().optional(),
    state: Joi.string().optional(),
    city: Joi.string().optional(),
    country: Joi.string().optional(),
    experience: Joi.string().optional(),
    salary: Joi.number().required().optional(),
    jobStatus: Joi.string()
      .valid(JobStatus.AVAILABLE, JobStatus.HIRED, JobStatus.INTERVIEW)
      .optional(),
    verificationStatus: Joi.string()
      .valid(
        VerificationStatus.IN_PROGRESS,
        VerificationStatus.NOT_VERIFIED,
        VerificationStatus.VERIFIED,
      )
      .optional(),
    profileMode: Joi.string()
      .valid(ProfileMode.ACTIVE, ProfileMode.INACTIVE)
      .optional(),
    profileImage: Joi.string().optional(),
    qualification: Joi.string().optional(),
    resume: Joi.string().optional(),
    gender: Joi.string().optional(),
    identification: Joi.string().optional(),
    nextOfKinFirstName: Joi.string().optional(),
    nextOfKinLastName: Joi.string().optional(),
    nextOfKinPhone: Joi.string().optional(),
    nextOfKinStreet: Joi.string().optional(),
    nextOfKinState: Joi.string().optional(),
    nextOfKinCity: Joi.string().optional(),
    nextOfKinCountry: Joi.string().optional(),
    nextOfKinRelationship: Joi.string().optional(),
  });

  return candidateSchema.validate(candidate);
};
