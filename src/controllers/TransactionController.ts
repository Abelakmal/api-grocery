import { NextFunction, Request, Response } from "express";
import { TransactionService } from "../services/implementations/TransactionService";
import { transactions_status } from "@prisma/client";

export class TransactionController {
  private transactionService: TransactionService;

  constructor() {
    this.transactionService = new TransactionService();
  }
  public async createTransaction(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const user_id = req.user?.id;
      const { address_id, total } = req.body;
      const data = await this.transactionService.createService(
        user_id as number,
        parseInt(address_id, 0),
        total
      );
      res.status(200).send({
        data,
      });
    } catch (error) {
      console.error(error);
      next(error);
    }
  }

  public async getTransactions(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const {  status } = req.query;
      const data = await this.transactionService.getTransactionsService(
        status as transactions_status | undefined,
      );
      res.status(200).json({
        data,
      });
    } catch (error) {
      console.error(error);
      next(error);
    }
  }

  public async getTransaction(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const { transaction_id } = req.params;
      const data = await this.transactionService.getTransactionService(
        transaction_id as string
      );
      res.status(200).json({
        data,
      });
    } catch (error) {
      console.error(error);
      next(error);
    }
  }

  public async transactionNotif(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      await this.transactionService.handleStatusService(req.body);
      res.status(200).json({
        data: "ok",
      });
    } catch (error) {
      console.error(error);
      next(error);
    }
  }
}
