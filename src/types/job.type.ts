import { Types } from 'mongoose';
import { CreatedAt } from '../enums/candidate.enum';
import { ICandidate } from './candidate.type';
import { IPage } from './paginate.type';

export interface IJob {
  title: string;
  company: string;
  description: string;
  responsibility: string;
  requirement: string;
  qualification: string;
  experience: number;
  salary: string;
  jobType: string;
  location: string;
  hiringManager?: Types.ObjectId;
  isAvailable?: boolean;
}

export interface IUpdateJob {
  title?: string;
  company?: string;
  description?: string;
  responsibility?: string;
  requirement?: string;
  qualification?: string;
  experience?: number;
  salary?: string;
  jobType?: string;
  location?: string;
  hiringManager?: Types.ObjectId;
  isAvailable?: boolean;
}

export interface IJobQuery extends IPage {
  salaryStart?: string;
  salaryStop?: string;
  createdAt?: CreatedAt;
  jobType?: string;
  role?: string;
  isAvailable?: string;
  search?: string;
}

export interface IJobFilter {
  salary?: ISalary;
  title?: any;
  isAvailable?: boolean;
  jobType?: string;
  name?: any;
  $and?: any;
}

export interface IJobSort {
  createdAt?: CreatedAt;
}

export interface ISalary {
  $gte?: number;
  $lte?: number;
}

export interface IJobOverview {
  job?: IJob;
  candidates?: ICandidate[];
  totalCandidates?: number;
}
