import { NextFunction, Request, Response } from "express";
import { CartService } from "../services/implementations/CartService";

export class CartController {
  private cartService: CartService;

  constructor() {
    this.cartService = new CartService();
  }
  public async addCart(req: Request, res: Response, next: NextFunction) {
    try {
      await this.cartService.addCartService(req.body);
      res.status(200).json({
        data: "ok",
      });
    } catch (error) {
      next(error);
    }
  }

  public async getCart(req: Request, res: Response, next: NextFunction) {
    try {
      const id = req.user?.id;
      const data = await this.cartService.getCartService(id as number);
      res.status(200).json({
        data,
      });
    } catch (error) {
      next(error);
    }
  }

  public async updateCart(req: Request, res: Response, next: NextFunction) {
    try {
      const id = req.user?.id;
      const data = await this.cartService.updateCartService(
        parseInt(req.params.id, 0),
        req.body,
        id as number
      );
      res.status(200).json({
        data,
      });
    } catch (error) {
      next(error);
    }
  }

  public async deleteCart(req: Request, res: Response, next: NextFunction) {
    try {
      const id = req.user?.id;
      await this.cartService.deleteCartService(
        parseInt(req.params.id),
        id as number
      );
      res.status(200).json({
        data: "ok",
      });
    } catch (error) {
      next(error);
    }
  }

  public async deleteManyCart(req: Request, res: Response, next: NextFunction) {
    try {
      const id = req.user?.id;
      await this.cartService.deleteManyCartService(id as number);
      res.status(200).json({
        data: "ok",
      });
    } catch (error) {
      next(error);
    }
  }
}
