import { Decimal } from "@prisma/client/runtime/library";

export interface ICart {
  id: number;
  product_id: number;
  user_id: number;
  quantity: number;
  price_at_time: Decimal;
}
