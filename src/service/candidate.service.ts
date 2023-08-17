import { Types } from 'mongoose';
import QueryString from 'qs';
import { JobStatus, ProfileMode, ProfileStatus } from '../enums/candidate.enum';
import ApiError from '../middlewares/error/ApiError';
import CandidateModel from '../models/candidate.model';
import {
  ICandidate,
  ICandidateFiles,
  IQuery,
  ISort,
  IUpdatecandidate,
} from '../types/candidate.type';
import { Ifiles } from '../types/file.type';
import {
  candidateFilter,
  candidateSort,
  completeProfile,
} from '../utils/helpers/candidate';
import logger from '../utils/logger';
import {
  validateCandidate,
  validateUpdateCandidate,
} from '../utils/validation/canditate.validation';
import { cloudinaryService } from './cloudinary.service';
import { fetchPaginatedData } from '../utils/helpers/paginate';

export const create = async (
  createCandidateDto: ICandidate,
  staffId: Types.ObjectId,
  files: Ifiles,
) => {
  const { error } = validateCandidate(createCandidateDto);

  if (!files?.profileImage || !files?.identification || !files?.resume) {
    throw new ApiError(
      400,
      'provide all media files (profileImage, identification, resume)',
    );
  }
  if (error) {
    throw new ApiError(400, error.message);
  }

  const candidate = await findByEmailAndPhone(
    createCandidateDto.email,
    createCandidateDto.phone,
  );

  if (candidate) {
    throw new ApiError(400, 'email or phone exist already');
  }

  createCandidateDto.staffId = staffId;

  //profile images
  const profileImage = await cloudinaryService(files['profileImage'][0]);
  createCandidateDto.profileImage = profileImage.secure_url;

  // resume
  const resume = await cloudinaryService(files['resume'][0]);
  createCandidateDto.resume = resume.secure_url;

  //identification
  const identification = await cloudinaryService(files['identification'][0]);
  createCandidateDto.identification = identification.secure_url;

  createCandidateDto.name = `${createCandidateDto.firstName} ${createCandidateDto.lastName}`;

  const newCandidate = await CandidateModel.create(createCandidateDto);

  const isComplete = completeProfile(newCandidate);

  if (isComplete) {
    newCandidate.profileStatus = ProfileStatus.COMPLETE;
    await newCandidate.save();
  }

  return newCandidate;
};

export const find = async (query: QueryString.ParsedQs) => {
  const filterDto = query as IQuery;
  const sortDto: ISort = {};
  const page = Number(query.page) || 1;
  const limit = Number(query.limit) || 10;

  sortDto.createdAt = filterDto.createdAt;
  sortDto.name = filterDto.name;

  delete filterDto.createdAt;
  delete filterDto.name;
  delete filterDto.page;
  delete filterDto.limit;

  const filter = candidateFilter(filterDto);

  const sort = candidateSort(sortDto);

  const populate = {
    path: 'staffId',
    select: 'firstName lastName',
  };

  const select = '-name';

  return fetchPaginatedData(
    CandidateModel,
    filter,
    sort,
    page,
    limit,
    populate,
    select,
  );
};

export const findOne = async (id: string) => {
  const candidate = await CandidateModel.findById(id)
    .select('-name')
    .populate('staffId', 'firstName lastName');

  if (!candidate) {
    throw new ApiError(404, 'candidate not found');
  }

  return candidate;
};

export const findByEmail = async (email: string) => {
  const candidate = await CandidateModel.findOne({ email });
  return candidate;
};

export const findByEmailAndPhone = async (email: string, phone: string) => {
  const candidate = await CandidateModel.findOne({
    $or: [{ email }, { phone }],
  });
  return candidate;
};

export const update = async (
  id: string,
  updateCandidate: IUpdatecandidate,
  files?: Ifiles,
) => {
  const { error } = validateUpdateCandidate(updateCandidate);

  if (error) {
    throw new ApiError(400, error.message);
  }

  if (files) {
    if (files['profileImage']) {
      const profileImage = await cloudinaryService(files['profileImage'][0]);
      updateCandidate.profileImage = profileImage.secure_url;
    }

    if (files['resume']) {
      const resume = await cloudinaryService(files['resume'][0]);
      updateCandidate.resume = resume.secure_url;
    }

    if (files['identification']) {
      const identification = await cloudinaryService(
        files['identification'][0],
      );
      updateCandidate.identification = identification.secure_url;
    }
  }

  if (updateCandidate.jobStatus === JobStatus.HIRED) {
    updateCandidate.hiredAt = new Date();
  }

  const candidate = await CandidateModel.findByIdAndUpdate(
    id,
    updateCandidate,
    { new: true },
  );

  if (!candidate) {
    throw new ApiError(404, 'candidate not found');
  }
  const isComplete = completeProfile(candidate);

  if (isComplete && candidate.profileStatus === ProfileStatus.IN_COMPLETE) {
    candidate.profileStatus = ProfileStatus.COMPLETE;
    await candidate.save();
  }

  return candidate;
};

export const deleteOne = async (id: string) => {
  const candidate = await findOne(id);
  await candidate.remove();
};

export const activate = async (id: string) => {
  const candidate = await findOne(id);

  if (candidate.profileMode === ProfileMode.ACTIVE) {
    throw new ApiError(403, 'candidate profile is already active');
  }

  candidate.profileMode = ProfileMode.ACTIVE;

  await candidate.save();
};

export const archive = async (id: string) => {
  const candidate = await findOne(id);

  if (candidate.isArchive) {
    throw new ApiError(404, 'candidate profile is archived already!');
  }

  candidate.isArchive = true;

  await candidate.save();
};

export const unarchive = async (id: string) => {
  const candidate = await CandidateModel.findById(id);

  if (!candidate) {
    throw new ApiError(404, 'candidate not found');
  }

  if (!candidate.isArchive) {
    throw new ApiError(404, 'candidate profile is not archived');
  }

  candidate.isArchive = false;
};
