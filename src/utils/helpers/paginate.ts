import { Aggregate, Model } from 'mongoose';
import { PaginatedResponse } from '../../types/paginate.type';

export const fetchPaginatedData = async <ModelType>(
  Model: Model<ModelType>,
  docQuery = {},
  sortQuery = '',
  page = 1,
  limit = 12,
  populate?: any,
  select?: string,
) => {
  const startIndex = (page - 1) * limit;
  const endIndex = page * limit;

  const response = {} as PaginatedResponse;

  response.data = await Model.find(docQuery)
    .select(select)
    .sort(sortQuery)
    .populate(populate)
    .skip(startIndex)
    .limit(limit);

  const count = response.data.length;

  const currentPage = page;
  // Next page is null if the endIndex is greater than the total number of records
  const nextPage = endIndex < count ? page + 1 : null;
  //Previous Page
  const prevPage = startIndex > 0 ? page - 1 : null;
  const totalRecords = count;
  const totalPages = Math.ceil(count / limit);

  response.pagination = {
    currentPage,
    nextPage,
    prevPage,
    totalRecords,
    totalPages,
  };

  return response;
};

export const PaginatedAggregationData = async <ModelType>(
  Model: Aggregate<any[]>,
  page = 1,
  limit = 12,
) => {
  const startIndex = (page - 1) * limit;
  const endIndex = page * limit;

  const response = {} as PaginatedResponse;

  response.data = await Model.skip(startIndex).limit(limit);

  const count = response.data.length;

  const currentPage = page;
  // Next page is null if the endIndex is greater than the total number of records
  const nextPage = endIndex < count ? page + 1 : null;
  //Previous Page
  const prevPage = startIndex > 0 ? page - 1 : null;
  const totalRecords = count;
  const totalPages = Math.ceil(count / limit);

  response.pagination = {
    currentPage,
    nextPage,
    prevPage,
    totalRecords,
    totalPages,
  };

  return response;
};
