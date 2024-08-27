import { Router } from "express";
import { verifyToken } from "../helper/jwt";
import { AdminController } from "../controllers/AdminController";

export class AdminRouter {
  private router: Router;
  private adminController: AdminController;

  constructor() {
    this.router = Router();
    this.adminController = new AdminController();
    this.initializeRouters();
  }

  private initializeRouters(): void {
    this.router.post(
      "/",
      verifyToken,
      this.adminController.createAdmin.bind(this.adminController)
    );
    this.router.get(
      "/",
      verifyToken,
      this.adminController.get.bind(this.adminController)
    );
    this.router.get(
      "/current",
      verifyToken,
      this.adminController.getCurrent.bind(this.adminController)
    );
    this.router.put(
      "/:id",
      verifyToken,
      this.adminController.updateAdmin.bind(this.adminController)
    );
    this.router.delete(
      "/:id",
      verifyToken,
      this.adminController.deleteAdmin.bind(this.adminController)
    );
  }

  public getRouter(): Router {
    return this.router;
  }
}
