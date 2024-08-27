import { PrismaClient, transactions_status } from "@prisma/client";
import { PENDING_PAYMENT } from "../../helper/constant";
import { IProduct } from "../../types/product.type";
import { nanoid } from "nanoid";
import { ICart } from "../../types/cart.type";

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
    snap_redirect_url: string | null = null
  ) {
    try {
      await this.prisma.transaction.create({
        data: {
          id: transaction_id,
          total: gross_amount,
          userId,
          status: PENDING_PAYMENT,
          snap_token,
          snap_redirect_url,
        },
      });
    } catch (error) {
      throw error;
    }
  }

  public async createTransactionItems(carts: ICart[], transaction_id: string) {
    try {
      return this.prisma.transactionsItem.createMany({
        data: carts.map((cart) => ({
          id: `TRX-ITEM-${nanoid(10)}`,
          transaction_id,
          product_id: cart.product_id,
          price: cart.price_at_time,
          quantity: cart.quantity,
        })),
      });
    } catch (error) {
      throw error;
    }
  }

  public async getTransactions(status: transactions_status) {
    try {
      let where = {};
      if (status) {
        where = {
          status,
        };
      }

      return this.prisma.transaction.findMany({
        where,
        include: {
          transactions_items: {
            include: {
              products: {
                select: {
                  id: true,
                  name: true,
                  price: true,
                  image: true,
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
      return this.prisma.transaction.findUnique({
        where: {
          id: transaction_id,
        },
        include: {
          transactions_items: {
            include: {
              products: true,
            },
          },
        },
      });
    } catch (error) {
      throw error;
    }
  }

  public async updateTransactionStatus(
    transaction_id: string,
    status: transactions_status,
    payment_method = null
  ) {
    try {
      return this.prisma.transaction.update({
        where: {
          id: transaction_id,
        },
        data: {
          status,
          payment_method,
        },
      });
    } catch (error) {
      throw error;
    }
  }
}
