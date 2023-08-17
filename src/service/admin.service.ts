import { JobStatus } from '../enums/candidate.enum';
import CandidateModel from '../models/candidate.model';
import QueryString from 'qs';
import { IDateQuery } from '../types';
import { PaginatedAggregationData } from '../utils/helpers/paginate';
import { getFilter, getPercent } from '../utils/helpers/admin';

interface Ifilter {
  profession?: { $regex?: any };
}

export const findRecruitmentOverview = async (query: QueryString.ParsedQs) => {
  const page = Number(query.page) || 1;
  const limit = Number(query.limit) || 10;
  const name = query.search as string;
  const filter: Ifilter = {};

  if (name) {
    filter.profession = { $regex: new RegExp(name, 'i') };
  }

  const jobs = CandidateModel.aggregate([
    {
      $match: filter,
    },

    {
      $group: {
        _id: '$profession',
        total: { $sum: 1 },
        hired: {
          $sum: { $cond: [{ $eq: ['$jobStatus', JobStatus.HIRED] }, 1, 0] },
        },
        available: {
          $sum: { $cond: [{ $eq: ['$jobStatus', JobStatus.AVAILABLE] }, 1, 0] },
        },
        interview: {
          $sum: { $cond: [{ $eq: ['$jobStatus', JobStatus.INTERVIEW] }, 1, 0] },
        },
      },
    },
  ]);

  return PaginatedAggregationData(jobs, page, limit);
};

export const findCandidateDemographic = async (query: QueryString.ParsedQs) => {
  let { startDate, stopDate } = query;

  if (!startDate || !stopDate) {
    let current = new Date();
    let prev = current.getTime() - 2592000000;
    stopDate = current.toISOString();
    startDate = new Date(prev).toDateString();
  }

  const { filter, dateFilter, previousDateFilter, previousFilter } = getFilter(
    startDate as string,
    stopDate as string,
  );

  const totalJobSeekers = await CandidateModel.countDocuments();
  const totalHired = await CandidateModel.find({
    jobStatus: JobStatus.HIRED,
  }).countDocuments();

  const numberOfCandidates = await CandidateModel.find(
    dateFilter,
  ).countDocuments();

  const numberOfHires = await CandidateModel.find(filter).countDocuments();

  const prevNumberOfCandidates = await CandidateModel.find(
    previousDateFilter,
  ).countDocuments();
  const prevNumberOfHires = await CandidateModel.find(
    previousFilter,
  ).countDocuments();

  const { candidatePercent, hirePercent } = getPercent({
    numberOfCandidates,
    numberOfHires,
    prevNumberOfCandidates,
    prevNumberOfHires,
  });

  return {
    candidates: { numberOfCandidates, candidatePercent },
    hires: { numberOfHires, hirePercent },
    totalJobSeekers,
    totalHired,
  };
};

export const plot = async (query: QueryString.ParsedQs) => {
  let { startDate, stopDate } = query;

  if (!startDate || !stopDate) {
    let current = new Date();
    let prev = current.getTime() - 2592000000;
    stopDate = current.toISOString();
    startDate = new Date(prev).toDateString();
  }

  const candidatePlot = await CandidateModel.aggregate([
    {
      $match: {
        createdAt: {
          $gte: new Date(startDate as string),
          $lte: new Date(stopDate as string),
        },
      },
    },

    {
      $project: {
        id: 1,
        day: { $dateToString: { format: '%Y-%m-%d', date: '$createdAt' } },
      },
    },

    {
      $group: {
        _id: '$day',
        count: { $sum: 1 },
      },
    },
  ]);

  const hirePlot = await CandidateModel.aggregate([
    {
      $match: {
        createdAt: {
          $gte: new Date(startDate as string),
          $lte: new Date(stopDate as string),
        },
        jobStatus: JobStatus.HIRED,
      },
    },

    {
      $project: {
        id: 1,
        day: { $dateToString: { format: '%Y-%m-%d', date: '$createdAt' } },
        // createdAt: { $gte: startDate, $lte: stopDate },
      },
    },

    {
      $group: {
        _id: '$day',
        count: { $sum: 1 },
      },
    },
  ]);

  return { candidatePlot, hirePlot };
};
