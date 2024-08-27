import { NextFunction, Request, Response } from "express";
import { UserService } from "../services/implementations/UserService";
import { ApiError } from "../error/ApiError";

export class UserController {
  private userService: UserService;

  constructor() {
    this.userService = new UserService();
  }

  public async registerUser(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      await this.userService.registerService(req.body);
      res.status(200).json({ data: "ok" });
    } catch (error) {
      next(error);
    }
  }

  public async get(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const id = req.user?.id;
      const data = await this.userService.getService(id as number);
      res.status(200).json({
        data,
      });
    } catch (error) {
      next(error);
    }
  }

  public async updateUser(req: Request, res: Response, next: NextFunction) {
    try {
      const id = req.user?.id;
      const data = await this.userService.updateService(id as number, req.body);
      res.status(200).json({
        data,
      });
    } catch (error) {
      next(error);
    }
  }
  public async updateImg(req: Request, res: Response, next: NextFunction) {
    try {
 
      if (!req.file) {
        throw new ApiError("must fill image", 400);
      }

      await this.userService.updateImgService(req.user?.id as number, req.file.filename)
      res.status(200).json({
        data: "ok",
      });
    } catch (error) {
      next(error);
    }
  }
}
