import { Router } from "express";
import { StockController } from "../controllers/StockController";
import { verifyToken } from "../helper/jwt";

export class StockRouter {
  private router: Router;
  private stockContoller: StockController;

  constructor() {
    this.router = Router();
    this.stockContoller = new StockController();
    this.initializeRouters();
  }

  private initializeRouters(): void {
    this.router.get(
      "/",
      this.stockContoller.getStocks.bind(this.stockContoller)
    );
    this.router.get(
      "/:id",
      this.stockContoller.getStockById.bind(this.stockContoller)
    );
    this.router.get(
      "/:id/store",
      verifyToken,
      this.stockContoller.getStockByStoreId.bind(this.stockContoller)
    );

    this.router.patch(
      "/:id",
      verifyToken,
      this.stockContoller.updateStock.bind(this.stockContoller)
    );
    this.router.get(
      "/history/:id/store",
      verifyToken,
      this.stockContoller.getHistoryStock.bind(this.stockContoller)
    );
  }

  public getRouter(): Router {
    return this.router;
  }
}
