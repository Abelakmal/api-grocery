import { IProduct } from "./product.type";

export interface IStock {
  id: number;
  amount: number;
  createdAt?: Date;
  updatedAt?: Date;
  productId: number;
  branchId: number;
  product:IProduct
}

export interface IStockChange {
  id: number;
  stockBefore: number;
  stockAfter: number;
  createdAt: Date;
  stockId: number;
}

