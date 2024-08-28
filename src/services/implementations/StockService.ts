import { Stock } from "@prisma/client";
import { ApiError } from "../../error/ApiError";
import { StockRepository } from "../../repository/prisma/StockRepository";
import { StoreBranchRepository } from "../../repository/prisma/StoreBranchRepository";
import { IResponse, IStock, IStockChange } from "../../types/stock.type";
import { IFilter } from "../../types/user.type";
import { IStockService } from "../interfaces/IStockService";

export class StockService implements IStockService {
  private stockRepository: StockRepository;
  private storeBranchRepository: StoreBranchRepository;
  constructor() {
    this.stockRepository = new StockRepository();
    this.storeBranchRepository = new StoreBranchRepository();
  }
  public async getStockByIdStoreService(storeId: number): Promise<IStock[]> {
    try {
      const isExist = await this.storeBranchRepository.getById(storeId);

      if (!isExist) {
        throw new ApiError("id is not found", 404);
      }
      const data = await this.stockRepository.getByStoreId(storeId);
      return data;
    } catch (error) {
      throw error;
    }
  }
  public async updateStockService(id: number, stock: IStock): Promise<void> {
    try {
      const isExist = await this.stockRepository.getById(id);
      if (!isExist) {
        throw new ApiError("id is not found", 404);
      }
      const data = await this.stockRepository.update(
        id,
        stock.amount,
        isExist.amount
      );
    } catch (error) {
      throw error;
    }
  }

  public async getHistoryStockService(
    storeId: number,
    startDate: string,
    endDate: string,
    categoryId: number = 0,
    search: string
  ): Promise<IStockChange[]> {
    try {
      const data = await this.stockRepository.getHistoriesStock(
        storeId,
        startDate,
        endDate,
        categoryId,
        search
      );
      return data;
    } catch (error) {
      throw error;
    }
  }

  public async getStockById(id: number): Promise<IStock> {
    try {
      const isExist = await this.stockRepository.getById(id);

      if (!isExist) {
        throw new ApiError("Id is not Found", 404);
      }

      return isExist;
    } catch (error) {
      throw error;
    }
  }

  public async getStocks(
    search: string,
    filter: IFilter,
    sort: string,
    page: number,
    pageSize: number,
    lat: string = "-6.186486",
    lng: string = "106.834091"
  ): Promise<IResponse<IStock>> {
    try {

      const skip = (page - 1) * pageSize;
      const data = await this.stockRepository.get(
        skip,
        pageSize,
        search,
        filter,
        sort,
        lat,
        lng
      );
      
      return {
        total: data.length,
        skip,
        limit: pageSize,
        data,
      };
    } catch (error) {
      throw error;
    }
  }
}
