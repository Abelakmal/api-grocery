import { Decimal } from "@prisma/client/runtime/library";
import { IProduct } from "./product.type";

export interface ICart {
  id: number;
  product_id: number;
  user_id: number;
  quantity: number;
  price_at_time: number;
}
