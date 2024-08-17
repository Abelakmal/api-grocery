import path from "path";
import { ApiError } from "../../error/ApiError";
import { CategoryRepository } from "../../repository/prisma/CategoryRepository";
import { ICategory } from "../../types/category.type";
import { ICategoryService } from "../interfaces/ICategoryService";
import { baseURL } from "../../helper/config";
import fs from "fs";

export class CategoryService implements ICategoryService {
  private categoryRepository: CategoryRepository;

  constructor() {
    this.categoryRepository = new CategoryRepository();
  }

  public async createService(
    category: ICategory,
    image: string,
    pathImg: string
  ): Promise<void> {
    try {
      category.image = `${baseURL}/media/categories/${image}`;
      await this.categoryRepository.create(category, pathImg);
    } catch (error) {
      throw error;
    }
  }

  public async getService(): Promise<ICategory[]> {
    try {
      const result = await this.categoryRepository.get();
      return result;
    } catch (error) {
      throw error;
    }
  }

  public async getDetailService(id: number): Promise<ICategory> {
    try {
      const data = await this.categoryRepository.getById(id);
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
    category: ICategory,
    file: Express.Multer.File | undefined
  ): Promise<ICategory> {
    try {
      if (file) {
        category.image = `${process.env.API_URL}/media/categories/${file.filename}`;
      }
      const data = await this.categoryRepository.getById(id);
      if (!data) {
        throw new ApiError("Id is not found", 404);
      }
      const result = await this.categoryRepository.update(id, category);
      if (file) {
        const filePath = path.resolve(
          "src/images" + data.image.replaceAll(`${baseURL}/media`, "")
        );

        fs.unlinkSync(filePath);
      }
      return result;
    } catch (error) {
      throw error;
    }
  }

  public async deleteService(id: number): Promise<void> {
    try {

      
      const data = await this.categoryRepository.getById(id);
      if (!data) {
        throw new ApiError("Id is not found", 404);
      }

      await this.categoryRepository.delete(id);
    } catch (error) {
      throw error;
    }
  }
}
