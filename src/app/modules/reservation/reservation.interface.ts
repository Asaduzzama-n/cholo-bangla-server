export type IWhereClause = {
  OR?: Array<{
    event?: {
      title?: {
        contains: string;
        mode: 'insensitive';
      };
    };
    user?: {
      firstName?: {
        contains: string;
        mode: 'insensitive';
      };
    };
  }>;
};
