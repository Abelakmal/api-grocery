import { Router } from "express";
import { TestController } from "../controllers/TestController";

export class TestRouter {
  private router: Router;
  private testController: TestController;

  constructor() {
    this.router = Router();
    this.testController = new TestController()
    this.initializeRouters();
  }

  private initializeRouters(): void {
    this.router.get("/", this.testController.getTest);
  }

  public getRouter(): Router {
    return this.router;
  }
}
