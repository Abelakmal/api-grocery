import { Router } from "express";
import { UserController } from "../controllers/UserController";
import { registerValidator } from "../validator/userValidator";
import { validate } from "../error/validate";
import { verifyToken } from "../helper/jwt";

export class UserRouter {
  private router: Router;
  private userController: UserController;

  constructor() {
    this.router = Router();
    this.userController = new UserController();
    this.initializeRouters();
  }

  private initializeRouters(): void {
    this.router.post(
      "/",
      registerValidator(),
      validate,
      this.userController.registerUser.bind(this.userController)
    );
    this.router.get(
      "/current",
      verifyToken,
      this.userController.get.bind(this.userController)
    );
  }

  public getRouter(): Router {
    return this.router;
  }
}
