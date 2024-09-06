import { Prisma, PrismaClient } from "@prisma/client";
import { ICart } from "../../types/cart.type";

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

  public async get(userId: number): Promise<ICart[]> {
    try {
      const result = await this.prisma.cart.findMany({
        where: {
          user_id: userId,
        },
        orderBy: {
          id: "desc",
        },
        include: {
          product: {
            include: {
              category: true,
            },
          },
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

  public async getByUserId(userId: number): Promise<ICart[]> {
    try {
      const data = await this.prisma.cart.findMany({
        where: {
          user_id: userId,
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
          AND: [{ product_id: id }, { user_id }],
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

  public async deleteMany(id: number): Promise<void> {
    try {
      await this.prisma.cart.deleteMany({
        where: {
          user_id: id,
        },
      });
    } catch (error) {
      throw error;
    }
  }
}
