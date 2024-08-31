import { ApiError } from "../../error/ApiError";
import { baseURL, imgUploadPath } from "../../helper/config";
import { ProductEs } from "../../repository/elasticsearch/ProductEs";
import { ProductRepository } from "../../repository/prisma/ProductRepository";
import { StoreBranchRepository } from "../../repository/prisma/StoreBranchRepository";
import { IResponse } from "../../types/general.type";
import { IProduct } from "../../types/product.type";
import { IFilter } from "../../types/user.type";
import { IProductService } from "../interfaces/IProductService";
import fs from "fs";
import path from "path";

export class ProductService implements IProductService {
  private productRepository: ProductRepository;
  private storeBranchRepository: StoreBranchRepository;
  private productEs: ProductEs;
  constructor() {
    this.productRepository = new ProductRepository();
    this.storeBranchRepository = new StoreBranchRepository();
    this.productEs = new ProductEs();
  }

  public async createService(
    product: IProduct,
    image: string,
    pathImg: string
  ): Promise<void> {
    try {
      const stores = await this.storeBranchRepository.get();
      if (stores.length === 0) {
        throw new ApiError("Store is not found", 404);
      }
      product.image = `${baseURL}/media/${image}`;
      await this.productRepository.create(product, pathImg, stores);
    } catch (error) {
      throw error;
    }
  }

  public async getService(
    query: any,
    page: number,
    pageSize: number
  ): Promise<IResponse<IProduct>> {
    try {
      const search = query.search || "";
      let filterCategory: IFilter = {};
      if (query.category1) {
        filterCategory.category1 = parseInt(query.category1 as string, 0);
      }

      if (query.category2) {
        filterCategory.category2 = parseInt(query.category2 as string, 0);
      }
      if (query.category3) {
        filterCategory.category3 = parseInt(query.category3 as string, 0);
      }

      let sort;

      switch (query.sort) {
        case "latest":
          sort = `ORDER BY p."id" DESC`;
          break;
        case "higher":
          sort = `ORDER BY p."price" ASC`;
          break;
        case "lowest":
          sort = `ORDER BY p."price" DESC`;
          break;
        default:
          sort = ``;
      }

      const skip = (page - 1) * pageSize;
      const data = await this.productRepository.get(
        search,
        filterCategory,
        sort,
        pageSize,
        skip
      );

      const total:any = await this.productRepository.count()

      return {
        total,
        skip,
        limit: pageSize,
        data,
      };
    } catch (error) {
      throw error;
    }
  }

  public async getDetailService(id: number): Promise<IProduct> {
    try {
      const data = await this.productRepository.getById(id);
      if (!data) {
        throw new ApiError("Id is not found", 404);
      }
      return data;
    } catch (error) {
      throw error;
    }
  }

  public async updateService(
    id: number,
    product: IProduct,
    file: Express.Multer.File | undefined
  ): Promise<IProduct> {
    try {
      if (file) {
        product.image = `${baseURL}/media/${file.filename}`;
      }

      const isExist = await this.productRepository.getById(id);
      if (!isExist) {
        throw new ApiError("Id is not found", 404);
      }
      const data = await this.productRepository.update(id, product);
      if (file) {
        const filePath = path.resolve(
          imgUploadPath + isExist.image.replaceAll(`${baseURL}/media`, "")
        );

        fs.unlinkSync(filePath);
      }

      return data;
    } catch (error) {
      throw error;
    }
  }

  public async deleteService(id: number): Promise<void> {
    try {
      const isExist = await this.productRepository.getById(id);
      if (!isExist) {
        throw new ApiError("Id is not found", 404);
      }
      await this.productRepository.delete(id);

      const filePath = path.resolve(
        imgUploadPath + isExist.image.replaceAll(`${baseURL}/media`, "")
      );

      fs.unlinkSync(filePath);
    } catch (error) {
      throw error;
    }
  }
}
