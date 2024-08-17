import { Router } from "express";
import { verifyToken } from "../helper/jwt";
import { CartController } from "../controllers/CartController";

export class CartRouter {
  private router: Router;
  private cartController: CartController;

  constructor() {
    this.router = Router();
    this.cartController = new CartController();
    this.initializeRouters();
  }

  private initializeRouters(): void {
    this.router.post(
      "/",
      verifyToken,
      this.cartController.addCart.bind(this.cartController)
    );
    this.router.get(
      "/",
      verifyToken,
      this.cartController.getCart.bind(this.cartController)
    );
    this.router.put(
      "/:id",
      verifyToken,
      this.cartController.updateCart.bind(this.cartController)
    );
    this.router.delete(
      "/:id",
      verifyToken,
      this.cartController.deleteCart.bind(this.cartController)
    );
  }

  public getRouter(): Router {
    return this.router;
  }
}
