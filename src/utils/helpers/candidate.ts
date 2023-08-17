import { ICandidate, IFilter, IQuery, ISort } from '../../types/candidate.type';
import logger from '../logger';

export const candidateFilter = (query: IQuery) => {
  let filter: IFilter = {};

  if (query?.jobStatus) {
    filter.jobStatus = query.jobStatus;
  }

  if (query?.verification) {
    filter.verificationStatus = query.verification;
  }

  if (query?.role) {
    filter.profession = query.role;
  }

  if (query?.profileMode) {
    try {
      filter.profileMode = query.profileMode;
    } catch (error) {
      logger.error('isActive filter should be boolean string ');
    }
  }

  if (query?.startDate) {
    filter.createdAt = { $gte: query.startDate };
  }

  if (query?.stopDate) {
    filter.createdAt = { $lte: query.stopDate };
  }

  if (query?.search) {
    filter.name = { $regex: query.search, $options: 'i' };
  }

  return filter;
};

export const candidateSort = (sortDto: ISort) => {
  const sort = [];
  if (sortDto?.createdAt) {
    sort.push(sortDto.createdAt);
  }

  if (sortDto?.name) {
    sort.push(sortDto.name);
  }

  return sort.join(' ');
};

export const completeProfile = (candidate: ICandidate) => {
  const {
    firstName,
    lastName,
    email,
    phone,
    dateOfBirth,
    gender,
    profession,
    street,
    state,
    city,
    country,
    jobStatus,
    profileStatus,
    experience,
    verificationStatus,
    salary,
    profileImage,
    profileMode,
    resume,
    identification,
    nextOfKinFirstName,
    nextOfKinLastName,
    nextOfKinPhone,
    nextOfKinStreet,
    nextOfKinState,
    nextOfKinCity,
    nextOfKinCountry,
    staffId,
  } = candidate;

  const data = {
    firstName,
    lastName,
    email,
    phone,
    dateOfBirth,
    gender,
    profession,
    street,
    state,
    city,
    country,
    jobStatus,
    experience,
    verificationStatus,
    salary,
    profileImage,
    profileMode,
    resume,
    identification,
    nextOfKinFirstName,
    nextOfKinLastName,
    nextOfKinPhone,
    nextOfKinStreet,
    nextOfKinState,
    nextOfKinCity,
    nextOfKinCountry,
    staffId,
  };

  type Tkey = keyof typeof data;
  const keys = Object.keys(data);

  for (let i = 0; i < keys.length; i++) {
    const key = <Tkey>keys[i];
    if (!data[key]) {
      return false;
    }
  }

  return true;
};

// const parseExperience = (experience: string){
//   const result = experience.split('-')
// }
