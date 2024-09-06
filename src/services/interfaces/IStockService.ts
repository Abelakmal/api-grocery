import { IResponse } from "../../types/general.type";
import { IStock, IStockChange } from "../../types/stock.type";
import { IFilter } from "../../types/user.type";

export interface IStockService {
  updateStockService(id: number, stock: IStock): Promise<void>;
  getStockById(id: number): Promise<IStock>;
  getStocks(
    search: string,
    filter: IFilter,
    sort: string,
    page: number,
    pageSize: number,
    lat: string,
    lng: string
  ): Promise<IResponse<IStock>>;

  getStockByIdStoreService(
    storeId: number,
    startDate: string,
    endDate: string,
    categoryId: number,
    search: string,
    page: number,
    pageSize: number
  ): Promise<IResponse<IStock>>;
  getHistoryStockService(
    storeId: number,
    startDate: string,
    endDate: string,
    categoryId: number,
    search: string,
    page: number,
    pageSize: number
  ): Promise<IResponse<IStockChange>>;
}
