import { Router } from "express";
import { verifyToken } from "../helper/jwt";
import { AddressController } from "../controllers/AddressController";

export class AddressRouter {
  private router: Router;
  private addressController: AddressController;

  constructor() {
    this.router = Router();
    this.addressController = new AddressController();
    this.initializeRouters();
  }

  private initializeRouters(): void {
    this.router.post(
      "/",
      verifyToken,
      this.addressController.CreateAddress.bind(this.addressController)
    );
    this.router.get(
      "/",
      verifyToken,
      this.addressController.getAddress.bind(this.addressController)
    );

    this.router.get("/main",verifyToken,this.addressController.getMain.bind(this.addressController))
    this.router.patch(
      "/:id/main",
      verifyToken,
      this.addressController.updateMain.bind(this.addressController)
    );
    this.router.put(
      "/:id",
      verifyToken,
      this.addressController.update.bind(this.addressController)
    );
    this.router.delete(
      "/:id",
      verifyToken,
      this.addressController.delete.bind(this.addressController)
    );
  }

  public getRouter(): Router {
    return this.router;
  }
}
