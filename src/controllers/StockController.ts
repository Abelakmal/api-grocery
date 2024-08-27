import { NextFunction, Request, Response } from "express";
import { StockService } from "../services/implementations/StockService";

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
      const data = await this.stockService.getStockByIdStoreService(
        parseInt(req.params.id, 0)
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
      const data = await this.stockService.getHistoryStockService(
        parseInt(id, 0),
        startDate as string,
        endDate as string,
        parseInt(categoryId as string, 0),
        search as string
      );
      res.status(200).json({
        data,
      });
    } catch (error) {
      next(error);
    }
  }
}
