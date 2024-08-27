import { IAuthService } from "../interfaces/IAuthService";
import { ApiError } from "../../error/ApiError";
import { comparePassword } from "../../helper/bcrypt";
import {
  createRefreshToken,
  createToken,
  verifyRefreshToken,
} from "../../helper/jwt";
import { ILogin } from "../../types/login.type";
import { UserRepository } from "../../repository/prisma/UserRepository";
import { AdminRepository } from "../../repository/prisma/AdminRepository";

export class AuthService implements IAuthService {
  private userRepository: UserRepository;
  private adminRepository: AdminRepository;

  constructor() {
    this.userRepository = new UserRepository();
    this.adminRepository = new AdminRepository();
  }
  public async loginUserService(
    email: string,
    password: string
  ): Promise<ILogin> {
    try {

      const user = await this.userRepository.getUserByEmail(email);

      if (!user) {
        throw new ApiError("Email or Password is wrong", 401);
      }

      const checkPassword = await comparePassword(password, user?.password);

      if (!checkPassword) {
        throw new ApiError("Email or Password is wrong", 401);
      }

      const token = createToken({ id: user.id });
      const refreshToken = createRefreshToken({ id: user.id });

      return {
        token,
        refreshToken,
      };
    } catch (error) {
      throw error;
    }
  }
  public async loginAdminService(
    email: string,
    password: string
  ): Promise<ILogin> {
    try {
      const admin = await this.adminRepository.getByEmail(email);
      if (!admin) {
        throw new ApiError("Email or Password is wrong", 401);
      }
      const checkPassword = await comparePassword(
        password,
        admin?.password as string
      );


      if (!checkPassword) {
        throw new ApiError("Email or Password is wrong", 401);
      }

      const token = createToken({ id: admin.id, isSuper: admin.isSuper });
      const refreshToken = createRefreshToken({
        id: admin.id,
        isSuper: admin.isSuper,
      });
      return {
        token,
        refreshToken,
      };
    } catch (error) {
      throw error;
    }
  }

  public async refreshTokenService(rfToken: string): Promise<ILogin> {
    try {
      const isValid = await verifyRefreshToken(rfToken);

      const token = createToken(isValid);
      const refreshToken = createRefreshToken(isValid);

      return {
        token,
        refreshToken,
      };
    } catch (error) {
      throw error;
    }
  }
}
