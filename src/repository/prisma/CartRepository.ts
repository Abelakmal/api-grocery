import { Prisma, PrismaClient } from "@prisma/client";
import { ICart, ICartWithStock } from "../../types/cart.type";

export class CartRepository {
  private prisma: PrismaClient;

  constructor() {
    this.prisma = new PrismaClient();
  }

  public async create(data: ICart): Promise<void> {
    try {
      await this.prisma.cart.create({
        data,
      });
    } catch (error) {
      throw error;
    }
  }

  public async get(user_id: number, address_id: number): Promise<ICart[]> {
    try {
      const result = await this.prisma.cart.findMany({
        where: {
          AND: [
            {
              user_id,
            },
            {
              address_id,
            },
          ],
        },
        orderBy: {
          id: "desc",
        },
        include: {
          stock: {
            include: {
              product: {
                include: {
                  category: true,
                },
              },
            },
          },
          user: true,
          address: true,
        },
      });
      return result;
    } catch (error) {
      throw error;
    }
  }

  public async getById(id: number, userId: number): Promise<ICart | null> {
    try {
      const data = await this.prisma.cart.findUnique({
        where: {
          id,
          user_id: userId,
        },
      });
      return data;
    } catch (error) {
      throw error;
    }
  }

  public async getByUserIdAndAddressId(
    userId: number,
    address_id: number
  ): Promise<ICartWithStock[]> {
    try {
      const data = await this.prisma.cart.findMany({
        where: {
          AND: [
            { user_id: userId },
            {
              address_id,
            },
          ],
        },
        include: {
          stock: {
            include: {
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

  public async getByProductId(
    id: number,
    user_id: number
  ): Promise<ICart | null> {
    try {
      const data = await this.prisma.cart.findFirst({
        where: {
          AND: [{ stock_id: id }, { user_id }],
        },
      });
      return data;
    } catch (error) {
      throw error;
    }
  }

  public async update(id: number, data: ICart): Promise<ICart> {
    try {
      const result = await this.prisma.cart.update({
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
      await this.prisma.cart.delete({
        where: {
          id,
        },
      });
    } catch (error) {
      throw error;
    }
  }

  public async deleteMany(user_id: number, address_id: number): Promise<void> {
    try {
      await this.prisma.cart.deleteMany({
        where: {
          user_id,
          address_id,
        },
      });
    } catch (error) {
      throw error;
    }
  }
}
