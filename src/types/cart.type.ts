import { Decimal } from "@prisma/client/runtime/library";
import { IProduct } from "./product.type";
import { IStock } from "./stock.type";

export interface ICart {
  id: number;
  stock_id: number;
  user_id: number;
  quantity: number;
  price_at_time: number;
  address_id: number;
}


export interface ICartWithStock {
  id: number;
  stock_id: number;
  user_id: number;
  quantity: number;
  price_at_time: number;
  address_id: number;
  stock:IStock
}