import { IProduct } from "../../types/product.type";
import { IFilter } from "../../types/user.type";

export interface IProductService {
  createService(
    product: IProduct,
    image: string,
    pathImg: string
  ): Promise<void>;
  getService(query:any): Promise<IProduct[]>;
  getDetailService(id: number): Promise<IProduct>;
  updateService(id: number, product: IProduct, file: Express.Multer.File | undefined): Promise<IProduct>;
  deleteService(id: number): Promise<void>;
}
