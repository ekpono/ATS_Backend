import { Types } from 'mongoose';
import { IDate } from '.';
import {
  CreatedAt,
  JobStatus,
  Name,
  ProfileMode,
  ProfileStatus,
  VerificationStatus,
} from '../enums/candidate.enum';

export interface ICandidate {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  dateOfBirth: string;
  gender: string;
  profession: string;
  street: string;
  state: string;
  city: string;
  country: string;
  jobStatus: JobStatus;
  hiredAt: Date | string;
  profileStatus: ProfileStatus;
  experience: string;
  verificationStatus: VerificationStatus;
  salary: string;
  profileImage: string;
  profileMode?: ProfileMode;
  resume: string;
  identification: string;
  nextOfKinFirstName: string;
  nextOfKinLastName: string;
  nextOfKinPhone: string;
  nextOfKinStreet: string;
  nextOfKinState: string;
  nextOfKinCity: string;
  nextOfKinCountry: string;
  nextOfKinRelationship: string;
  staffId: Types.ObjectId;
  isArchive: boolean;
  qualification: string;
  name: string;
}

export interface IUpdatecandidate {
  firstName?: string;
  lastName?: string;
  dateOfBirth: string;
  profession?: string;
  gender?: string;
  street?: string;
  state?: string;
  city?: string;
  country?: string;
  jobStatus?: JobStatus;
  hiredAt: Date | string;
  experience?: number;
  verificationStatus?: VerificationStatus;
  profileStatus?: ProfileStatus;
  profileMode?: ProfileMode;
  profileImage?: string;
  salary?: string;
  resume?: string;
  identification?: string;
  nextOfKinFirstName?: string;
  nextOfKinLastName?: string;
  nextOfKinPhone?: string;
  nextOfKinStreet?: string;
  nextOfKinState?: string;
  nextOfKinCity?: string;
  nextOfKinCountry?: string;
  qualification?: string;
}

export interface ICandidateFiles {
  resume: Express.Multer.File[];
  identification: Express.Multer.File[];
  profileImage?: Express.Multer.File[];
}

export interface IQuery {
  page?: Number;
  limit?: Number;
  startDate?: string;
  stopDate?: string;
  name?: Name;
  createdAt?: CreatedAt;
  jobStatus?: JobStatus;
  role?: string;
  verification?: VerificationStatus;
  location?: string;
  profileMode?: ProfileMode;
  search?: string;
}

export interface IFilter {
  jobStatus?: JobStatus;
  profession?: string;
  verificationStatus?: VerificationStatus;
  state?: string;
  profileMode?: ProfileMode;
  createdAt?: IDate;
  name?: any;
}

export interface ISort {
  name?: Name;
  createdAt?: CreatedAt;
}

// export interface IQualified extends IFilter {
//   experience: number;
//   qualification: string;
//   profession: string;
//   isActive: boolean;
//   isArchive: boolean;
// }
