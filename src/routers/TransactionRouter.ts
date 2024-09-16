import { Router } from "express";
import { verifyToken } from "../helper/jwt";
import { TransactionController } from "../controllers/TransactionController";

export class TransactionRouter {
  private router: Router;
  private transactionController: TransactionController;

  constructor() {
    this.router = Router();
    this.transactionController = new TransactionController();
    this.initializeRouters();
  }

  private initializeRouters(): void {
    this.router.get(
      "/:storeId/store",
      verifyToken,
      this.transactionController.getTransactionByStore.bind(
        this.transactionController
      )
    );
    this.router.get(
      "/",
      verifyToken,
      this.transactionController.getTransactions.bind(
        this.transactionController
      )
    );
    this.router.get(
      "/:transaction_id",
      verifyToken,
      this.transactionController.getTransaction.bind(this.transactionController)
    );
    this.router.post(
      "/notification",
      this.transactionController.transactionNotif.bind(
        this.transactionController
      )
    );
    this.router.post(
      "/",
      verifyToken,
      this.transactionController.createTransaction.bind(
        this.transactionController
      )
    );
  }

  public getRouter(): Router {
    return this.router;
  }
}
