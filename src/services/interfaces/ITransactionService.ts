import { transactions_status } from "@prisma/client";
import {
  ITransaction,
  ITransactionResponse,
} from "../../types/transaction.type";

export interface ITransactionService {
  createService(
    userId: number,
    address_id: number,
    total: number
  ): Promise<ITransactionResponse>;
  getTransactionService(transaction_id: string): Promise<ITransaction>;
  getTransactionsService(
    status: transactions_status | undefined 
  ): Promise<ITransaction[]>;
  handleStatusService(callback: any): Promise<void>;
}
