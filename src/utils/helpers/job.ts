import { IJobFilter, IJobQuery, IJobSort } from '../../types/job.type';
import logger from '../logger';

export const jobFilter = (filterDto: IJobQuery) => {
  const filter: IJobFilter = {};

  if (filterDto?.role && filterDto?.search) {
    filter['$and'] = [
      { title: { $regex: filterDto.search, $options: 'i' } },
      { title: filterDto?.role },
    ];
  }
  if (filterDto?.role) {
    filter.title = filterDto.role;
  }

  if (filterDto?.search) {
    filter.title = { $regex: filterDto.search, $options: 'i' };
  }

  if (filterDto?.isAvailable) {
    try {
      filter.isAvailable = JSON.parse(filterDto.isAvailable);
    } catch (error) {
      logger.error('isAvailable should be a boolean string');
    }
  }

  if (filterDto?.salaryStart && filterDto.salaryStop) {
    try {
      const start = Number(filterDto.salaryStart);
      const stop = Number(filterDto.salaryStop);

      filter.salary = { $gte: start, $lte: stop };
    } catch (error) {
      logger.error('salary range filter has to be string of number');
    }
  }

  if (filterDto?.jobType) {
    filter.jobType = filterDto.jobType;
  }

  return filter;
};

export const jobSort = (sortDto: IJobSort) => {
  const sort = [];

  if (sortDto.createdAt) {
    sort.push(sortDto.createdAt);
  }

  return sort.join(' ');
};
