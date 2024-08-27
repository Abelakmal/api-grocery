import { PrismaClient } from "@prisma/client";
import { IAdmin } from "../../types/admin.type";

export class AdminRepository {
  private prisma: PrismaClient;

  constructor() {
    this.prisma = new PrismaClient();
  }

  public async create(data: IAdmin): Promise<void> {
    try {
      await this.prisma.admin.create({
        data,
      });
    } catch (error) {
      throw error;
    }
  }

  public async get(): Promise<IAdmin[]> {
    try {
      const result = await this.prisma.admin.findMany({
        select: {
          email: true,
          name: true,
          isSuper: true,
          store_branch: true,
          storeId:true,
          password: false,
        },
      });
      return result as any;
    } catch (error) {
      throw error;
    }
  }

  public async getById(id: number): Promise<IAdmin | null> {
    try {
      const data = await this.prisma.admin.findUnique({
        where: {
          id,
        },
      });
      return data as any;
    } catch (error) {
      throw error;
    }
  }
  public async getByEmail(email: string): Promise<IAdmin | null> {
    try {
      const data = await this.prisma.admin.findUnique({
        where: {
          email,
        },
      });
      return data;
    } catch (error) {
      throw error;
    }
  }

  public async update(id: number, data: IAdmin): Promise<IAdmin> {
    try {
      const result = await this.prisma.admin.update({
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
      await this.prisma.admin.delete({
        where: {
          id,
        },
      });
    } catch (error) {
      throw error;
    }
  }
}
