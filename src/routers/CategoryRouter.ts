import { Router } from "express";
import { upload } from "../middleware/multer";
import { convertToInt } from "../middleware/convertToInt";
import { CategoryController } from "../controllers/CategoryController";

export class CategoryRouter {
  private router: Router;
  private categoryController: CategoryController;

  constructor() {
    this.router = Router();
    this.categoryController = new CategoryController();
    this.initializeRouters();
  }

  private initializeRouters(): void {
    this.router.post(
      "/",
      upload("categories"),
      this.categoryController.createCategory.bind(this.categoryController)
    );
    this.router.get(
      "/",
      this.categoryController.getCategory.bind(this.categoryController)
    );
    this.router.get(
      "/:id",
      this.categoryController.getDetailCategory.bind(this.categoryController)
    );
    this.router.put(
      "/:id",
      upload("categories"),
      this.categoryController.updateCategory.bind(this.categoryController)
    );
    this.router.delete(
      "/:id",
      this.categoryController.deleteCategory.bind(this.categoryController)
    );
  }

  public getRouter(): Router {
    return this.router;
  }
}
