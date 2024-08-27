import { NextFunction, Request, Response } from "express";
import { ProductService } from "../services/implementations/ProductService";
import fs from "fs";
import { IFilter } from "../types/user.type";

export class ProductController {
  private productService: ProductService;

  constructor() {
    this.productService = new ProductService();
  }

  public async createProduct(req: Request, res: Response, next: NextFunction) {
    try {
      await this.productService.createService(
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
  public async getProduct(req: Request, res: Response, next: NextFunction) {
    try {
      const data = await this.productService.getService(req.query);
      res.status(200).json({
        data,
      });
    } catch (error) {
      next(error);
    }
  }
  public async getDetailProduct(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    try {
      const data = await this.productService.getDetailService(
        parseInt(req.params.id, 0)
      );
      res.status(200).json({
        data,
      });
    } catch (error) {
      next(error);
    }
  }
  public async updateProduct(req: Request, res: Response, next: NextFunction) {
    try {
      const data = await this.productService.updateService(
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
  public async deleteProduct(req: Request, res: Response, next: NextFunction) {
    try {
      await this.productService.deleteService(parseInt(req.params.id, 0));
      res.status(200).json({
        data: "ok",
      });
    } catch (error) {
      next(error);
    }
  }
}
