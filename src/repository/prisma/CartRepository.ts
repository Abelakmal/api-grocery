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

  public async get(): Promise<ICart[]> {
    try {
      const result = await this.prisma.cart.findMany({});
      return result;
    } catch (error) {
      throw error;
    }
  }

  public async getById(id: number): Promise<ICart | null> {
    try {
      const data = await this.prisma.cart.findUnique({
        where: {
          id,
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
}
