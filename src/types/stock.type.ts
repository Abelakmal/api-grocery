export interface IStock {
  id: number;
  amount: number;
  createdAt?: Date;
  updatedAt?: Date;
  productId: number;
  branchId: number;
}

export interface IStockChange {
  id: number;
  stockBefore: number;
  stockAfter: number;
  createdAt: Date;
  stockId: number;
}

export interface IResponse<T> {
  total: number;
  limit: number;
  skip: number;
  data: T[];
}
