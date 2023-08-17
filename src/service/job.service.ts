import { Types } from 'mongoose';
import ApiError from '../middlewares/error/ApiError';
import JobModel from '../models/job.model';
import {
  IJob,
  IJobFilter,
  IJobOverview,
  IJobQuery,
  IJobSort,
  IUpdateJob,
} from '../types/job.type';
import {
  jobValidation,
  validateStatus,
} from '../utils/validation/job.validation';
import QueryString from 'qs';
import logger from '../utils/logger';
import { JobStatus } from '../enums/candidate.enum';
import { jobFilter, jobSort } from '../utils/helpers/job';
import { candidateFilter, candidateSort } from '../utils/helpers/candidate';
import { IQuery, ISort } from '../types/candidate.type';
import CandidateModel from '../models/candidate.model';
import { IPage } from '../types/paginate.type';
import { fetchPaginatedData } from '../utils/helpers/paginate';

export const create = async (createjobDto: IJob, staffId: Types.ObjectId) => {
  const { error } = jobValidation(createjobDto);
  createjobDto.hiringManager = staffId;
  return await JobModel.create(createjobDto);
};

export const find = async (query: QueryString.ParsedQs) => {
  const filterDto = query as IJobQuery;
  const sortDto = { createdAt: filterDto.createdAt } as IJobSort;
  const { limit, page } = filterDto;

  delete filterDto.createdAt;
  delete filterDto.limit;
  delete filterDto.page;

  const filter = jobFilter(filterDto);
  const sort = jobSort(sortDto);

  const jobs = await fetchPaginatedData(JobModel, filter, sort, page, limit);

  return jobs;
};

export const findOne = async (id: string) => {
  const job = await JobModel.findById(id);

  if (!job) {
    throw new ApiError(404, 'job not found');
  }

  return job;
};

export const update = async (id: string, updatejobDto: IUpdateJob) => {
  const job = await JobModel.findByIdAndUpdate(id, updatejobDto, { new: true });
  return job;
};

export const deleteOne = async (id: string) => {
  await JobModel.deleteOne({ id });
};

export const findQualifiedCandidates = async (
  id: string,
  query?: QueryString.ParsedQs,
) => {
  const job = await findOne(id);

  const { experience, title: profession, qualification } = job;

  const filterDto = query as IQuery;

  const sortDto = {
    createdAt: filterDto?.createdAt,
    name: filterDto?.name,
  } as ISort;

  delete filterDto?.createdAt;

  const isActive = true;
  const isArchive = false;
  const jobStatus = { $in: [JobStatus.AVAILABLE, JobStatus.INTERVIEW] };

  let filter = {
    experience: { $gte: experience },
    qualification,
    profession,
    isActive,
    isArchive,
    jobStatus,
  };

  filter = { ...candidateFilter(filterDto), ...filter };
  const sort = candidateSort(sortDto);

  const candidates = await CandidateModel.find(filter).sort(sort);
  const jobCandidates = { job, candidates };

  return jobCandidates;
};

export const findJobOverview = async (query?: QueryString.ParsedQs) => {
  const filterDto = query as IJobQuery;
  const sortDto = { createdAt: filterDto.createdAt } as IJobSort;
  const { limit, page } = filterDto;

  delete filterDto.createdAt;
  delete filterDto.limit;
  delete filterDto.page;

  const isActive = true;
  const isArchive = false;
  const jobStatus = { $in: [JobStatus.AVAILABLE, JobStatus.INTERVIEW] };

  const filter = jobFilter(filterDto);
  const sort = jobSort(sortDto);
  // const select = 'experience title qualification';

  const jobs = await fetchPaginatedData(JobModel, filter, sort, page, limit);

  const jobOverview: IJobOverview[] = [];

  for (let i = 0; i < jobs.data.length; i++) {
    const { experience, title: profession, qualification } = jobs.data[i];

    let filter = {
      experience: { $eq: experience },
      qualification,
      profession,
      isActive,
      isArchive,
      jobStatus,
    };

    filter = { ...candidateFilter(filterDto), ...filter };

    const candidates = await CandidateModel.find(filter);

    const jobData = {
      job: jobs.data[i],
      // candidates,
      totalCandidates: candidates.length,
    };

    jobOverview.push(jobData);
  }

  jobs.data = jobOverview;

  return jobs;
};

export const changeJobStatus = async (id: string, status: boolean) => {
  const job = await findOne(id);

  const { error } = validateStatus({ status });

  if (error) {
    throw new ApiError(400, error.message);
  }

  job.isAvailable = status;

  await job.save();

  return job;
};
