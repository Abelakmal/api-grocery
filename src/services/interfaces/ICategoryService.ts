import { ICategory } from "../../types/category.type";

export interface ICategoryService {
    createService(
        category: ICategory,
        image: string,
        pathImg: string
      ): Promise<void>;
    getService(): Promise<ICategory[]>;
    getDetailService(id: number): Promise<ICategory>;
    updateService(id: number, category:ICategory, file: Express.Multer.File | undefined): Promise<ICategory>;
    deleteService(id: number): Promise<void>;
}