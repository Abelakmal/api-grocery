import { NextFunction, Request, Response } from "express";
import { UserService } from "../services/implementations/UserService";

export class UserController {
  private userService: UserService;

  constructor() {
    this.userService = new UserService();
  }

  public async registerUser(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      await this.userService.registerService(req.body);
      res.status(200).json({ data: "ok" });
    } catch (error) {
      next(error);
    }
  }
}
