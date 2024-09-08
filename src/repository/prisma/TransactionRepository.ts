import { PrismaClient, transactions_status } from "@prisma/client";
import { PENDING_PAYMENT } from "../../helper/constant";
import { nanoid } from "nanoid";
import { ICart } from "../../types/cart.type";
import {
  ITransactionItem,
  ITransactionUpdate,
} from "../../types/transaction.type";

export class TransactionRepository {
  private prisma: PrismaClient;

  constructor() {
    this.prisma = new PrismaClient();
  }

  public async create(
    transaction_id: string,
    gross_amount: number,
    userId: number,
    snap_token: string | null = null,
    snap_redirect_url: string | null = null,
    address_id: number,
    carts: ICart[]
  ) {
    try {
      await this.prisma.$transaction(async (tx) => {
        await tx.transaction.create({
          data: {
            id: transaction_id,
            total: gross_amount,
            userId,
            status: PENDING_PAYMENT,
            snap_token,
            snap_redirect_url,
            address_id,
          },
        });

        await tx.transactionsItem.createMany({
          data: carts.map((cart) => ({
            id: `TRX-ITEM-${nanoid(10)}`,
            transaction_id,
            stock_id: cart.stock_id,
            price: cart.price_at_time,
            quantity: cart.quantity,
          })),
        });

        await tx.cart.deleteMany({
          where: {
            id: {
              in: carts.map((cart) => cart.id),
            },
          },
        });
      });
    } catch (error) {
      throw error;
    }
  }

  public async getTransactions(status: transactions_status | undefined) {
    try {
      let where = {};
      if (status) {
        where = {
          status,
        };
      }

      return this.prisma.transaction.findMany({
        where,
        orderBy: {
          createdAt: "desc",
        },
        include: {
          transactions_items: {
            include: {
              stock: {
                include: {
                  product: true,
                  storeBranch: true,
                  transactionItem: true,
                },
              },
            },
          },
        },
      });
    } catch (error) {
      throw error;
    }
  }

  public async getTransactionById(transaction_id: string) {
    try {
      return this.prisma.transaction.findFirst({
        where: {
          id: transaction_id,
        },
        include: {
          transactions_items: {
            include: {
              stock: {
                include: {
                  product: true,
                },
              },
            },
          },
        },
      });
    } catch (error) {
      throw error;
    }
  }

  public async getTransactionsByIdStore(id_store: number) {
    try {
      const data = await this.prisma.transactionsItem.findMany({
        where: {
          stock: {
            storeBranch: {
              id: id_store,
            },
          },
        },
        include: {
          transactions: true,
          stock: true,
        },
      });
      return data;
    } catch (error) {
      throw error;
    }
  }

  public async updateTransactionStatus(
    transaction_id: string,
    data: ITransactionUpdate
  ) {
    try {
      return this.prisma.transaction.update({
        where: {
          id: transaction_id,
        },
        data,
      });
    } catch (error) {
      throw error;
    }
  }

  public async updateTransaction(
    transaction_id: string,
    data: ITransactionUpdate,
    transactions_items: ITransactionItem[]
  ) {
    try {
      await this.prisma.$transaction(async (tx) => {
        for (const item of transactions_items) {
          await this.prisma.stock.update({
            where: {
              id: item.stock_id,
            },
            data: {
              amount: { decrement: item.quantity },
            },
          });
        }
        await tx.transaction.update({
          where: {
            id: transaction_id,
          },
          data,
        });
      });
    } catch (error) {
      throw error;
    }
  }
}
