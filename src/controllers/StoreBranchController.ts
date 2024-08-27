import { NextFunction, Request, Response } from "express";
import { StoreBranchService } from "../services/implementations/StoreBranchService";

export class StoreBranchController {
  private storeBranchService: StoreBranchService;

  constructor() {
    this.storeBranchService = new StoreBranchService();
  }

  public async createStoreBranch(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    try {
        const isSuper = req.admin?.isSuper;
      await this.storeBranchService.createService(req.body,isSuper as boolean);
      res.status(200).json({
        data: "ok",
      });
    } catch (error) {
      next(error);
    }
  }

  public async getStoreBranch(req: Request, res: Response, next: NextFunction) {
    try {
        const isSuper = req.admin?.isSuper;
      const data = await this.storeBranchService.getService(isSuper as boolean);
      res.status(200).json({
        data,
      });
    } catch (error) {
      next(error);
    }
  }

  public async getDetailStoreBranch(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    try {
      const data = await this.storeBranchService.getDetailService(
        parseInt(req.params.id, 0)
      );
      res.status(200).json({
        data,
      });
    } catch (error) {
      next(error);
    }
  }

  public async updateStoreBranch(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    try {
      const data = await this.storeBranchService.updateService(
        parseInt(req.params.id, 0),
        req.body
      );
      res.status(200).json({
        data,
      });
    } catch (error) {
      next(error);
    }
  }

  public async deleteStoreBranch(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    try {
        
      await this.storeBranchService.deleteService(parseInt(req.params.id, 0));
      res.status(200).json({
        data: "ok",
      });
    } catch (error) {
      next(error);
    }
  }
}
