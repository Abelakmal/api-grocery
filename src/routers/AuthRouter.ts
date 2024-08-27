import { Router } from "express";
import { registerValidator } from "../validator/userValidator";
import { validate } from "../error/validate";
import { AuthController } from "../controllers/AuthController";
import { authValidator } from "../validator/authValidator";

export class AuthRouter {
  private router: Router;
  private authController: AuthController;

  constructor() {
    this.router = Router();
    this.authController = new AuthController();
    this.initializeRouters();
  }

  private initializeRouters(): void {
    this.router.post(
      "/login-users",
      authValidator(),
      validate,
      this.authController.loginUser.bind(this.authController)
    );
    this.router.post(
      "/login-admin",
      authValidator(),
      validate,
      this.authController.loginAdmin.bind(this.authController)
    );
    this.router.post(
      "/refreshToken",
      this.authController.refreshToken.bind(this.authController)
    );
  }

  public getRouter(): Router {
    return this.router;
  }
}
