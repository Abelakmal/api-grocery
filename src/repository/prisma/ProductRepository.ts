import { Prisma, PrismaClient } from "@prisma/client";
import { IProduct } from "../../types/product.type";
import fs from "fs";
import { IFilter } from "../../types/user.type";
import { IStoreBranch } from "../../types/storeBranch.type";

export class ProductRepository {
  private prisma: PrismaClient;

  constructor() {
    this.prisma = new PrismaClient();
  }

  public async create(
    data: IProduct,
    pathImg: string,
    stores: IStoreBranch[]
  ): Promise<void> {
    try {
      await this.prisma.$transaction(async (tx) => {
        const product = await this.prisma.product.create({
          data,
        });
        let stock;
        let stockChange;

        for (const store of stores) {
          stock = await this.prisma.stock.create({
            data: {
              amount: 0,
              productId: product.id,
              branchId: store.id,
            },
          });

          stockChange = await this.prisma.stockChange.create({
            data: {
              stockAfter: 0,
              stockBefore: 0,
              stockId: stock.id,
            },
          });
        }
        return product;
      });
    } catch (error) {
      if(pathImg){
        fs.unlinkSync(pathImg);
      }
      throw error;
    }
  }

  public async get(
    search: string,
    filter: IFilter,
    sort: string,
    take: number,
    skip: number
  ): Promise<IProduct[]> {
    try {
      let categoryFilter = "";
      if (filter.category1 || filter.category2 || filter.category3) {
        categoryFilter = `
          AND (
            ${filter.category1 ? `p."categoryId" = ${filter.category1}` : ""}
            ${
              filter.category1 && (filter.category2 || filter.category3)
                ? "OR"
                : ""
            }
            ${filter.category2 ? `p."categoryId" = ${filter.category2}` : ""}
            ${filter.category2 && filter.category3 ? "OR" : ""}
            ${filter.category3 ? `p."categoryId" = ${filter.category3}` : ""}
          )
        `;
      }

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
        p."createdAt" AS "product_createdAt",
        p."updatedAt" AS "product_updatedAt",
        c."id" AS "categoryId", 
        c."name" AS "categoryName", 
        c."image" AS "categoryImage"
      FROM "Product" AS p 
      INNER JOIN "Category" AS c ON p."categoryId" = c."id" 
      WHERE LOWER(p."name") LIKE '%' || ${search.toLowerCase()} || '%'
      ${Prisma.raw(categoryFilter)}
      ${Prisma.raw(sort)}
      LIMIT ${take} OFFSET ${skip}
    `;

      const groupedResults = result.map((item: any) => ({
        id: item.id,
        name: item.name,
        description: item.description,
        weight: item.weight,
        unitWeight: item.unitWeight,
        image: item.image,
        price: item.price,
        categoryId: item.categoryId,
        createdAt: item.product_createdAt,
        updateAt: item.product_updatedAt,
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

  public async count(): Promise<number> {
    try {
      const count = await this.prisma.product.count({});
      return count;
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
          stock: {
            include: {
              storeBranch: true,
            },
          },
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
