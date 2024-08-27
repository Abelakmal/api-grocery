import { Router } from "express";
import { StoreBranchController } from "../controllers/StoreBranchController";
import { verifyToken } from "../helper/jwt";

export class StoreBranchRouter {
  private router: Router;
  private storeBranchController: StoreBranchController;

  constructor() {
    this.router = Router();
    this.storeBranchController = new StoreBranchController();
    this.initializeRouters();
  }

  private initializeRouters(): void {
    this.router.post(
      "/",
      verifyToken,
      this.storeBranchController.createStoreBranch.bind(
        this.storeBranchController
      )
    );
    this.router.get(
      "/",
      verifyToken,
      this.storeBranchController.getStoreBranch.bind(this.storeBranchController)
    );
    this.router.get(
      "/:id",
      verifyToken,
      this.storeBranchController.getDetailStoreBranch.bind(
        this.storeBranchController
      )
    );
    this.router.put(
      "/:id",
      verifyToken,
      this.storeBranchController.updateStoreBranch.bind(
        this.storeBranchController
      )
    );
    this.router.delete(
      "/:id",
      verifyToken,
      this.storeBranchController.deleteStoreBranch.bind(
        this.storeBranchController
      )
    );
  }

  public getRouter(): Router {
    return this.router;
  }
}
