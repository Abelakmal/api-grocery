import { PrismaClient } from "@prisma/client";
import { IStoreBranch } from "../../types/storeBranch.type";

export class StoreBranchRepository {
  private prisma: PrismaClient;

  constructor() {
    this.prisma = new PrismaClient();
  }

  public async create(data: IStoreBranch): Promise<void> {
    try {
      await this.prisma.$transaction(async (tx) => {
        const products = await tx.product.findMany({});
        const store = await tx.storeBranch.create({
          data,
        });
        let stock;
        let stockChange;
        for (const product of products) {
          stock = await tx.stock.create({
            data: {
              amount: 0,
              productId: product.id,
              branchId: store.id,
            },
          });

          stockChange = await tx.stockChange.create({
            data: {
              stockAfter: 0,
              stockBefore: 0,
              stockId: stock.id,
            },
          });
        }
      });
    } catch (error) {
      throw error;
    }
  }

  public async get(): Promise<IStoreBranch[]> {
    try {
      const result = await this.prisma.storeBranch.findMany({});
      return result;
    } catch (error) {
      throw error;
    }
  }

  public async getById(id: number): Promise<IStoreBranch | null> {
    try {
      const data = await this.prisma.storeBranch.findUnique({
        where: {
          id,
        },
        include: {
          stock: {
            select: {
              product: true,
            },
          },
        },
      });
      return data;
    } catch (error) {
      throw error;
    }
  }

  public async update(id: number, data: IStoreBranch): Promise<IStoreBranch> {
    try {
      const result = await this.prisma.storeBranch.update({
        where: {
          id,
        },
        data,
      });
      return result;
    } catch (error) {
      throw error;
    }
  }

  public async delete(id: number): Promise<void> {
    try {
      await this.prisma.storeBranch.delete({
        where: {
          id,
        },
      });
    } catch (error) {
      throw error;
    }
  }
}
