export interface IPage {
  page?: number;
  limit?: number;
}

export interface PaginatedData {
  currentPage: number;
  nextPage: number | null;
  prevPage: number | null;
  totalRecords: number;
  totalPages: number;
}

export interface PaginatedResponse {
  data: any[];
  pagination: PaginatedData;
}
