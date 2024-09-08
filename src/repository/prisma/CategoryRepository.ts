import { Prisma, PrismaClient } from "@prisma/client";
import fs from "fs";
import { ICategory } from "../../types/category.type";

export class CategoryRepository {
  private prisma: PrismaClient;

  constructor() {
    this.prisma = new PrismaClient();
  }

  public async create(data: ICategory, pathImg: string): Promise<void> {
    try {
      await this.prisma.category.create({
        data,
      });
    } catch (error) {
      if(pathImg){
        fs.unlinkSync(pathImg);
      }
      throw error;
    }
  }

  public async get(): Promise<ICategory[]> {
    try {
      const result = await this.prisma.category.findMany({});
      return result;
    } catch (error) {
      throw error;
    }
  }

  public async getById(id: number): Promise<ICategory | null> {
    try {
      const data = await this.prisma.category.findUnique({
        where: {
          id,
        },
        include: {
          products:true
        },
      });
      return data;
    } catch (error) {
      throw error;
    }
  }

  public async update(id: number, data: ICategory): Promise<ICategory> {
    try {
      const result = await this.prisma.category.update({
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
      await this.prisma.category.delete({
        where: {
          id,
        },
      });
    } catch (error) {
      throw error;
    }
  }
}
