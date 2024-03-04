export type IWhereClause = {
  OR?: Array<{
    title?: {
      contains: string;
      mode: 'insensitive';
    };
    destinations?: {
      has: string;
    };
    organizer?: {
      firstName: {
        contains: string;
        mode: 'insensitive';
      };
    };
  }>;
};

export type IPaginationOptions = {
  page?: string | undefined;
  limit?: string | undefined;
  sortBy?: string;
  searchTerm?: string;
  sortOrder?: 'asc' | 'desc';
};
