import { IStock, IStockChange } from "../../types/stock.type";

export interface IStockService {
  updateStockService(id: number, stock: IStock): Promise<void>;
  getStockByIdStoreService(storeId: number): Promise<IStock[]>;
  getHistoryStockService(
    storeId: number,
    startDate: string,
    endDate: string,
    categoryId: number,
    search: string
  ): Promise<IStockChange[]>;
}
