import { transactions_status, TransactionsItem } from "@prisma/client";
import { ICart } from "./cart.type";
import { IStock } from "./stock.type";

export interface ITransactionResponse {
  id: string;
  status: string;
  carts: ICart[];
  snap_token: string;
  snap_redirect_url: string;
}

export interface ITransactionUpdate {
  status: transactions_status;
  payment_method: string;
  payment_link?: string;
  va_number?: string;
}

export interface ITransaction {
  id: string;
  total: number;
  status: transactions_status;
  userId: number;
  snap_token: string | null;
  snap_redirect_url: string | null;
  payment_method: string | null;
  payment_link: string | null;
  va_number: string | null;
  address_id: number;
  createdAt: Date;
  updatedAt: Date;
  transactions_items: TransactionsItem[];
}

export interface ITransactionItem {
  id: string;
  transaction_id: string;
  stock_id: number;
  price: number;
  quantity: number;
  createdAt: Date;
  updatedAt: Date;
  stock: IStock;
}
