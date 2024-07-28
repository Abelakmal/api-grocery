import { IAuthService } from "../interfaces/IAuthService";
import { UserRepository } from "../../repository/UserRepository";
import { ApiError } from "../../error/ApiError";
import { comparePassword } from "../../helper/bcrypt";
import {
  createRefreshToken,
  createToken,
  verifyRefreshToken,
} from "../../helper/jwt";
import { ILogin } from "../../types/login.type";

export class AuthService implements IAuthService {
  private userRepository: UserRepository;

  constructor() {
    this.userRepository = new UserRepository();
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
  public async refreshTokenService(rfToken: string): Promise<ILogin> {
    try {
      const isValid = await verifyRefreshToken(rfToken);

      const token = createToken({ id: isValid });
      const refreshToken = createRefreshToken({ id: isValid });

      return {
        token,
        refreshToken,
      };
    } catch (error) {
      throw error;
    }
  }
}
