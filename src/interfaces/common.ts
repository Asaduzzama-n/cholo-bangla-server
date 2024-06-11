export type IGenericResponse<T> = {
  meta: {
    page: number;
    limit: number;
    total: number;
  };
  data: T;
};

export type IPaginationOptions = {
  page?: string | undefined;
  limit?: string | undefined;
  sortBy?: string;
  searchTerm?: string;
  sortOrder?: 'asc' | 'desc';
};
