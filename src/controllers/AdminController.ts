import { NextFunction, Request, Response } from "express";
import { ApiError } from "../error/ApiError";
import { AdminService } from "../services/implementations/AdminService";

export class AdminController {
  private adminService: AdminService;

  constructor() {
    this.adminService = new AdminService();
  }

  public async createAdmin(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const isSuper = req.admin?.isSuper;
      await this.adminService.createService(req.body, isSuper as boolean);
      res.status(200).json({ data: "ok" });
    } catch (error) {
      next(error);
    }
  }

  public async get(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const isSuper = req.admin?.isSuper;
      const page = parseInt(req.query.page as string, 0) || 1;
      const pageSize = parseInt(req.query.pageSize as string, 0) || 10;
      const data = await this.adminService.getService(
        isSuper as boolean,
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

  public async getCurrent(req: Request, res: Response, next: NextFunction) {
    try {
      const id = req.admin?.id;
      const data = await this.adminService.getCurrentService(id as number);
      res.status(200).json({
        data,
      });
    } catch (error) {
      next(error);
    }
  }

  public async updateAdmin(req: Request, res: Response, next: NextFunction) {
    try {
      const id = req.user?.id;
      const isSuper = req.admin?.isSuper;
      const data = await this.adminService.updateService(
        id as number,
        req.body,
        isSuper as boolean
      );
      res.status(200).json({
        data,
      });
    } catch (error) {
      next(error);
    }
  }

  public async deleteAdmin(req: Request, res: Response, next: NextFunction) {
    try {
      const id = req.user?.id;
      const isSuper = req.admin?.isSuper;
      const data = await this.adminService.deleteService(
        id as number,
        isSuper as boolean
      );
      res.status(200).json({
        data,
      });
    } catch (error) {
      next(error);
    }
  }
}
