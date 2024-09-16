import { transactions_status } from "@prisma/client";
import {
  ITransaction,
  ITransactionResponse,
} from "../../types/transaction.type";
import { IResponse } from "../../types/general.type";

export interface ITransactionService {
  createService(
    userId: number,
    address_id: number,
    total: number
  ): Promise<ITransactionResponse>;
  getTransactionService(transaction_id: string): Promise<ITransaction>;
  getTransactionsService(
    status: transactions_status | undefined,
    user_id: number
  ): Promise<ITransaction[]>;
  getTransactionsByIdStoreService(
    status: transactions_status | undefined,
    storeId: number,
    search: string,
    page: number,
    pageSize: number
  ): Promise<IResponse<ITransaction>>;
  handleStatusService(callback: any): Promise<void>;
}
