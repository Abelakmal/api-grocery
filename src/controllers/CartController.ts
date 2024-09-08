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

  public async getCartByAddress(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    try {
      const id = req.user?.id;
      const id_address = req.params.id;
      const data = await this.cartService.getCartByAddressService(
        id as number,
        parseInt(id_address, 0)
      );
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
      await this.cartService.deleteManyCartService(
        id as number,
        parseInt(req.params.address_id)
      );
      res.status(200).json({
        data: "ok",
      });
    } catch (error) {
      next(error);
    }
  }
}
