import { ILogin } from "../../types/login.type";

export interface IAuthService {
  loginUserService(email: string, password: string): Promise<ILogin>;
  loginAdminService(email: string, password: string): Promise<ILogin>;
  refreshTokenService(refreshToken: string): Promise<ILogin>;
  forgotPassword(email: string): Promise<void>;
}
