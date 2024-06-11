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
