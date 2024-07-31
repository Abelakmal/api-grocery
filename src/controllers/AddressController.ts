import { NextFunction, Request, Response } from "express";
import { AddressService } from "../services/implementations/AddressService";

export class AddressController {
  private addressService: AddressService;

  constructor() {
    this.addressService = new AddressService();
  }

  public async CreateAddress(req: Request, res: Response, next: NextFunction) {
    try {
      await this.addressService.createService(req.user?.id as number, req.body);
      res.status(200).json({
        data: "ok",
      });
    } catch (error) {
      next(error);
    }
  }

  public async getAddress(req: Request, res: Response, next: NextFunction) {
    try {
      const data = await this.addressService.getService(req.user?.id as number);
      res.status(200).json({
        data,
      });
    } catch (error) {
      next(error);
    }
  }

  public async updateMain(req: Request, res: Response, next: NextFunction) {
    try {
      await this.addressService.updateMainService(
        req.user?.id as number,
        parseInt(req.params.id, 0)
      );
      res.status(200).json({
        data: "ok",
      });
    } catch (error) {
      next(error);
    }
  }

  public async update(req: Request, res: Response, next: NextFunction) {
    try {
      const data = await this.addressService.updateService(
        parseInt(req.params.id, 0),
        req.user?.id as number,
        req.body
      );

      res.status(200).json({
        data,
      });
    } catch (error) {
      next(error);
    }
  }

  public async delete(req: Request, res: Response, next: NextFunction) {
    try {
      await this.addressService.deleteService(
        req.user?.id as number,
        parseInt(req.params.id, 0)
      );
      res.status(200).json({
        data: "ok",
      });
    } catch (error) {
      next(error);
    }
  }
}
