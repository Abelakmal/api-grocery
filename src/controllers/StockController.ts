import { NextFunction, Request, Response } from "express";
import { StockService } from "../services/implementations/StockService";
import { IFilter } from "../types/user.type";

export class StockController {
  private stockService: StockService;

  constructor() {
    this.stockService = new StockService();
  }

  public async updateStock(req: Request, res: Response, next: NextFunction) {
    try {
      await this.stockService.updateStockService(
        parseInt(req.params.id, 0),
        req.body
      );

      res.status(200).json({
        data: "ok",
      });
    } catch (error) {
      next(error);
    }
  }

  public async getStockByStoreId(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    try {
      const page = parseInt(req.query.page as string, 0) || 1;
      const pageSize = parseInt(req.query.pageSize as string, 0) || 10;
      const data = await this.stockService.getStockByIdStoreService(
        parseInt(req.params.id, 0),
        page,
        pageSize
      );

      res.status(200).json({
        data,
      });
    } catch (error) {
      next(error);
    }
  }

  public async getHistoryStock(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    try {
      const { id } = req.params;
      const { startDate, endDate, categoryId, search } = req.query;
      const page = parseInt(req.query.page as string, 0) || 1;
      
      const pageSize = parseInt(req.query.pageSize as string, 0) || 10;
      const data = await this.stockService.getHistoryStockService(
        parseInt(id, 0),
        startDate as string,
        endDate as string,
        parseInt(categoryId as string, 0),
        search as string,
        page,
        pageSize
      );
      res.status(200).json({
        data,
      });
    } catch (error) {
      next(error);
    }
  }

  public async getStocks(req: Request, res: Response, next: NextFunction) {
    try {
      const search = (req.query.search as string) || "";
      let filterCategory: IFilter = {};
      if (req.query.category1) {
        filterCategory.category1 = parseInt(req.query.category1 as string, 0);
      }

      if (req.query.category2) {
        filterCategory.category2 = parseInt(req.query.category2 as string, 0);
      }
      if (req.query.category3) {
        filterCategory.category3 = parseInt(req.query.category3 as string, 0);
      }

      let sort;

      switch (req.query.sort) {
        case "latest":
          sort = `ORDER BY "product_createdAt" DESC`;
          break;
        case "higher":
          sort = `ORDER BY price DESC`;
          break;
        case "lowest":
          sort = `ORDER BY price ASC`;
          break;
        default:
          sort = ``;
      }

      const page = parseInt(req.query.page as string, 0) || 1;
      const pageSize = parseInt(req.query.pageSize as string, 0) || 10;

      const data = await this.stockService.getStocks(
        search,
        filterCategory,
        sort,
        page,
        pageSize,
        req.query.latitude as string,
        req.query.longitude as string
      );
      res.status(200).json(data);
    } catch (error) {
      next(error);
    }
  }

  public async getStockById(req: Request, res: Response, next: NextFunction) {
    try {
      const data = await this.stockService.getStockById(
        parseInt(req.params.id, 0)
      );
      res.status(200).json({
        data,
      });
    } catch (error) {
      next(error);
    }
  }
}
