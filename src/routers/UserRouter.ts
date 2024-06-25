import { Router } from "express";
import { UserController } from "../controllers/UserController";
import { registerValidator } from "../validator/UserValidator";
import { validate } from "../error/validate";

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
  }

  public getRouter(): Router {
    return this.router;
  }
}
