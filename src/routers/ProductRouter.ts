import { Router } from "express";
import { ProductController } from "../controllers/ProductController";
import { upload } from "../middleware/multer";
import { convertToInt } from "../middleware/convertToInt";

export class ProductRouter {
  private router: Router;
  private productController: ProductController;

  constructor() {
    this.router = Router();
    this.productController = new ProductController();
    this.initializeRouters();
  }

  private initializeRouters(): void {
    this.router.post(
      "/",
      upload("products"),
      convertToInt(["weight", "price", "stock", "categoryId"]),
      this.productController.createProduct.bind(this.productController)
    );
    this.router.get(
      "/",
      this.productController.getProduct.bind(this.productController)
    );
    this.router.get(
      "/:id",
      this.productController.getDetailProduct.bind(this.productController)
    );
    this.router.put(
      "/:id",
      upload("products"),
      convertToInt(["weight", "price", "stock", "categoryId"]),
      this.productController.updateProduct.bind(this.productController)
    );
    this.router.delete(
      "/:id",
      this.productController.deleteProduct.bind(this.productController)
    );
  }

  public getRouter(): Router {
    return this.router;
  }
}
