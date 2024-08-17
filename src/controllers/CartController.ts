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
      const data = await this.cartService.getCartService();
      res.status(200).json({
        data,
      });
    } catch (error) {
      next(error);
    }
  }

  public async updateCart(req: Request, res: Response, next: NextFunction) {
    try {
      const data = await this.cartService.updateCartService(
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

  public async deleteCart(req: Request, res: Response, next: NextFunction) {
    try {
      await this.cartService.deleteCartService(parseInt(req.params.id));
      res.status(200).json({
        data: "ok",
      });
    } catch (error) {
      next(error);
    }
  }
}
