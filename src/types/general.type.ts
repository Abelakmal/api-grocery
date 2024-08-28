export interface IResponse<T> {
    total: number;
    limit: number;
    skip: number;
    data: T[];
  }
  