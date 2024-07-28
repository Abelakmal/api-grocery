import { NextFunction, Request, Response } from "express";
import { AuthService } from "../services/implementations/AuthService";
import { ILogin } from "../types/login.type";

export class AuthController {
  private authService: AuthService;

  constructor() {
    this.authService = new AuthService();
  }

  public async loginUser(req: Request, res: Response, next: NextFunction) {
    try {
      const { email, password } = req.body;
      const result: ILogin = await this.authService.loginUserService(
        email,
        password
      );
      res
        .cookie("refreshToken", result.refreshToken)
        .status(200)
        .json({
          data: {
            token: result.token,
          },
        });
    } catch (error) {
      next(error);
    }
  }

  public async refreshToken(req: Request, res: Response, next: NextFunction) {
    try {
      const result = await this.authService.refreshTokenService(
        req.cookies.refreshToken
      );
      res
        .cookie("refreshToken", result.refreshToken)
        .status(200)
        .json({
          data: {
            token: result.token,
          },
        });
    } catch (error) {
      next(error);
    }
  }
}
