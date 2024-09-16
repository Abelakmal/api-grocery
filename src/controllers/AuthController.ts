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
        .cookie("refreshToken", result.refreshToken, {
          httpOnly: true,
          secure: true,
          sameSite: "none",
          maxAge: 24 * 60 * 60 * 1000,
        })
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

  public async loginAdmin(req: Request, res: Response, next: NextFunction) {
    try {
      const { email, password } = req.body;
      const result: ILogin = await this.authService.loginAdminService(
        email,
        password
      );
      res
        .cookie("refreshToken", result.refreshToken, {
          httpOnly: true,
          secure: true,
          sameSite: "none",
          maxAge: 24 * 60 * 60 * 1000,
        })
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
        .cookie("refreshToken", result.refreshToken, {
          httpOnly: true,
          secure: true,
          sameSite: "none",
          maxAge: 24 * 60 * 60 * 1000,
        })
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

  public async forgotPassword(req: Request, res: Response, next: NextFunction) {
    try {
      const { email } = req.params;
      await this.authService.forgotPassword(email);
      res.status(200).json({
        data: "ok",
      });
    } catch (error) {
      next(error);
    }
  }

  public async logout(req: Request, res: Response, next: NextFunction) {
    try {

      res.clearCookie("refreshToken", {
        httpOnly: true,
        secure: true,
        sameSite: "none",
        path: "/",
      });

      res.status(200).json({
        data: "ok",
      });
    } catch (error) {
      next(error);
    }
  }
}
