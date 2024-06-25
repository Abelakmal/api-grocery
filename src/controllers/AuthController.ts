import { NextFunction, Request, Response } from "express";
import { AuthService } from "../services/implementations/AuthService";

export class AuthController {
  private authService: AuthService;

  constructor() {
    this.authService = new AuthService();
  }

  public async loginUser(req: Request, res: Response, next: NextFunction) {
    try {
      const { email, password } = req.body;
      const result = await this.authService.loginUserService(email, password);
      
      res.status(200).json({
        data: result
      });
    } catch (error) {
      next(error);
    }
  }
}
