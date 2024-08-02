import { Prisma, PrismaClient } from "@prisma/client";
import { IProduct } from "../../types/product.type";
import fs from "fs";
import { IFilter } from "../../types/user.type";

export class ProductRepository {
  private prisma: PrismaClient;

  constructor() {
    this.prisma = new PrismaClient();
  }

  public async create(data: IProduct, pathImg: string): Promise<IProduct> {
    try {
      const result = await this.prisma.product.create({
        data,
      });
      return result;
    } catch (error) {
      fs.unlinkSync(pathImg);
      throw error;
    }
  }

  public async get(
    search: string,
    filter: IFilter,
    sort: string
  ): Promise<IProduct[]> {
    try {
      const result: any = await this.prisma.$queryRaw`
        SELECT 
          p."id", 
          p."name", 
          p."description", 
          p."weight", 
          p."unitWeight", 
          p."image", 
          p."price", 
          p."categoryId", 
          p."stock", 
          c."id" AS "categoryId", 
          c."name" AS "categoryName", 
          c."image" AS "categoryImage"
        FROM "Product" AS p 
        INNER JOIN "Category" AS c ON p."categoryId" = c."id" 
        WHERE LOWER(p."name") LIKE '%' || ${search.toLowerCase()} || '%' 
        OR (p."categoryId" = ${filter.category1} 
            OR p."categoryId" = ${filter.category2} 
            OR p."categoryId" = ${filter.category3}) 
        ${Prisma.raw(sort)}`;

      const groupedResults = result.map((item: any) => ({
        id: item.id,
        name: item.name,
        description: item.description,
        weight: item.weight,
        unitWeight: item.unitWeight,
        image: item.image,
        price: item.price,
        stock: item.stock,
        category: {
          id: item.categoryId,
          name: item.categoryName,
          image: item.categoryImage,
        },
      }));

      return groupedResults;
    } catch (error) {
      throw error;
    }
  }

  public async getById(id: number): Promise<IProduct | null> {
    try {
      const data = await this.prisma.product.findUnique({
        where: {
          id,
        },
        include: {
          category: true,
        },
      });
      return data;
    } catch (error) {
      throw error;
    }
  }

  public async update(id: number, data: IProduct): Promise<IProduct> {
    try {
      const result = await this.prisma.product.update({
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
      await this.prisma.product.delete({
        where: {
          id,
        },
      });
    } catch (error) {
      throw error;
    }
  }
}
