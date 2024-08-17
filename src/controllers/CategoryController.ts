import { NextFunction, Request, Response } from "express";
import fs from "fs";
import { CategoryService } from "../services/implementations/CategoryService";

export class CategoryController {
  private categoryService: CategoryService;

  constructor() {
    this.categoryService = new CategoryService();
  }

  public async createCategory(req: Request, res: Response, next: NextFunction) {
    try {
      await this.categoryService.createService(
        req.body,
        req.file?.filename as string,
        req.file?.path as string
      );
      res.status(200).json({
        data: "ok",
      });
    } catch (error) {
      next(error);
    }
  }
  public async getCategory(req: Request, res: Response, next: NextFunction) {
    try {
      const data = await this.categoryService.getService();
      res.status(200).json({
        data,
      });
    } catch (error) {
      next(error);
    }
  }

  public async getDetailCategory(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    try {
      const data = await this.categoryService.getDetailService(
        parseInt(req.params.id, 0)
      );
      res.status(200).json({
        data,
      });
    } catch (error) {
      next(error);
    }
  }
  public async updateCategory(req: Request, res: Response, next: NextFunction) {
    try {
      const data = await this.categoryService.updateService(
        parseInt(req.params.id, 0),
        req.body,
        req.file
      );
      res.status(200).json({
        data,
      });
    } catch (error) {
      if (req.file) {
        fs.unlinkSync(req.file?.path);
      }
      next(error);
    }
  }
  public async deleteCategory(req: Request, res: Response, next: NextFunction) {
    try {
      await this.categoryService.deleteService(parseInt(req.params.id, 0));
      res.status(200).json({
        data: "ok",
      });
    } catch (error) {
      next(error);
    }
  }
}
