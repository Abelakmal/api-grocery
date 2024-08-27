import { PrismaClient } from "@prisma/client";

export class StockRepository {
  private prisma: PrismaClient;

  constructor() {
    this.prisma = new PrismaClient();
  }

  public async update(id: number, stockAfter: number, stockBefore: number) {
    try {
      const update = this.prisma.stock.update({
        where: {
          id,
        },
        data: {
          amount: stockAfter,
        },
      });

      const history = this.prisma.stockChange.create({
        data: {
          stockId: id,
          stockAfter,
          stockBefore,
        },
      });
      return await this.prisma.$transaction([update, history]);
    } catch (error) {
      throw error;
    }
  }

  public async getById(id: number) {
    try {
      const data = await this.prisma.stock.findUnique({
        where: {
          id,
        },
      });
      return data;
    } catch (error) {
      throw error;
    }
  }

  public async getByStoreId(storeId: number) {
    try {
      const data = await this.prisma.stock.findMany({
        where: {
          branchId: storeId,
        },
        include: {
          stockChange: true,
          product: {
            include: {
              category: true,
            },
          },
        },
      });
      return data;
    } catch (error) {
      throw error;
    }
  }

  public async getHistoriesStock(
    id: number,
    startDate: string,
    endDate: string,
    categoryId: number = 0,
    search: string
  ) {
    try {
      let AND: [] | any = [{ stock: { branchId: id } }];
      let product = {};
      let createdAt = {};

      if (categoryId && categoryId > 0) {
        product = {
          categoryId,
        };
        AND.push({ stock: { product } });
      }
      if (startDate && endDate) {
        createdAt = {
          gte: new Date(startDate),
          lte: new Date(endDate),
        };
        AND.push({ createdAt });
      }

      if (search) {
        product = {
          name: {
            contains: search,
            mode: "insensitive",
          },
        };
        AND.push({ stock: { product } });
      }

      const result = await this.prisma.stockChange.findMany({
        where: {
          AND,
        },
        include: {
          stock: {
            include: {
              product: {
                include: {
                  category: true,
                },
              },
              storeBranch: true,
            },
          },
        },
      });
      return result;
    } catch (error) {
      throw error;
    }
  }
}
