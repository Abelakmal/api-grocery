import { Prisma, PrismaClient } from "@prisma/client";
import { IFilter } from "../../types/user.type";

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
        include: {
          product: {
            include: {
              category: true,
            },
          },
          storeBranch: true,
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
    search: string,
    skip: number,
    take: number
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
          stock: {
            branchId: 1,
          },
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
        skip,
        take,
      });

      return result;
    } catch (error) {
      throw error;
    }
  }

  public async get(
    skip: number,
    take: number,
    search: string,
    filter: IFilter,
    sort: string,
    lat: string,
    lng: string
  ) {
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
       WITH ProductPagination AS (
      SELECT 
        s."id",
        s."amount",
        s."createdAt" AS "stock_createdAt",
        s."updatedAt" AS "stock_updatedAt",
        p."id" AS id_product,
        p."name" AS product_name,
        p."description",
        p."weight",
        p."unitWeight",
        p."image" AS product_image,
        p."price",
        p."createdAt" AS "product_createdAt",
        p."updatedAt" AS "product_updatedAt",
        c."name" AS category_name,
        c."image" AS category_image,
        sb."name" AS store_name,
        sb."location",
        (6371 * acos(LEAST(1, GREATEST(-1,
          cos(radians(CAST(${lat} AS numeric(9,6)))) * cos(radians(CAST(sb."latitude" AS numeric(9,6)))) *
          cos(radians(CAST(sb."longitude" AS numeric(9,6))) - radians(CAST(${lng} AS numeric(9,6)))) +
          sin(radians(CAST(${lat} AS numeric(9,6)))) * sin(radians(CAST(sb."latitude" AS numeric(9,6))))
        )))) AS distance
      FROM "Stock" AS s
      INNER JOIN "Product" AS p ON s."productId" = p."id"
      INNER JOIN "Category" AS c ON p."categoryId" = c."id"
      INNER JOIN "StoreBranch" AS sb ON s."branchId" = sb."id"
      WHERE 
        LOWER(p."name") LIKE '%' || ${search.toLowerCase()} || '%' 
        ${Prisma.raw(categoryFilter)}
        AND (6371 * acos(LEAST(1, GREATEST(-1,
          cos(radians(CAST(${lat} AS numeric(9,6)))) * cos(radians(CAST(sb."latitude" AS numeric(9,6)))) *
          cos(radians(CAST(sb."longitude" AS numeric(9,6))) - radians(CAST(${lng} AS numeric(9,6)))) +
          sin(radians(CAST(${lat} AS numeric(9,6)))) * sin(radians(CAST(sb."latitude" AS numeric(9,6))))
        )))) <= 50
    )
    SELECT 
      *
    FROM ProductPagination
    ${Prisma.raw(sort)}
    LIMIT ${take} OFFSET ${skip}
    `;

      const groupedResults = result.map((item: any) => ({
        id: item.id,
        amount: item.amount,
        createdAt: item.stock_createdAt,
        updateAt: item.stock_updatedAt,
        product: {
          name: item.product_name,
          description: item.description,
          weight: item.weight,
          unitWeight: item.unitWeight,
          image: item.product_image,
          price: item.price,
          categoryId: item.categoryId,
          createdAt: item.product_createdAt,
          updateAt: item.product_updatedAt,
          category: {
            name: item.category_name,
            image: item.category_image,
          },
        },
        branchStore: {
          name: item.store_name,
          location: item.location,
        },
      }));

      return groupedResults;
    } catch (error) {
      throw error;
    }
  }

  public async countByIdStore(id: number): Promise<number> {
    try {
      
      const data = await this.prisma.stockChange.count({
        where: {
          stock: {
            branchId: id,
          },
        },
      });
      return data;
    } catch (error) {
      throw error;
    }
  }

  public async countBylocation(lat: string, lng: string): Promise<number> {
    try {
      const count: any = await this.prisma.$queryRaw`
      SELECT 
    COUNT(*) ,
    (6371 * acos(LEAST(1, GREATEST(-1,
      cos(radians(CAST(${lat} AS numeric(9,6)))) * cos(radians(CAST(sb."latitude" AS numeric(9,6)))) *
      cos(radians(CAST(sb."longitude" AS numeric(9,6))) - radians(CAST(${lng} AS numeric(9,6)))) +
      sin(radians(CAST(${lat} AS numeric(9,6)))) * sin(radians(CAST(sb."latitude" AS numeric(9,6))))
    )))) AS distance
  FROM "Stock" AS s
  INNER JOIN "Product" AS p ON s."productId" = p."id"
  INNER JOIN "StoreBranch" AS sb ON s."branchId" = sb."id"
  GROUP BY distance
    `;

      return count[0].count;
    } catch (error) {
      throw error;
    }
  }
}
