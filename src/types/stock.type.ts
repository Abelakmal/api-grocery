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