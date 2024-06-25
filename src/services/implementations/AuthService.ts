import { IAuthService } from "../interfaces/IAuthService";
import { UserRepository } from "../../repository/UserRepository";
import { ApiError } from "../../error/ApiError";
import { comparePassword } from "../../helper/bcrypt";
import { createToken } from "../../helper/jwt";
import { ILogin } from "../../types/login.type";

export class AuthService implements IAuthService {
  private userRepository: UserRepository;

  constructor() {
    this.userRepository = new UserRepository();
  }
  public async loginUserService(email: string, password: string): Promise<ILogin> {
    try {
      const user = await this.userRepository.getUserByEmail(email);

      if (!user || (await comparePassword(password, user?.password))) {
        throw new ApiError("Email or Password is wrong", 401);
      }

      const token = createToken({ id: user.id });

      return {
        token,
      };
    } catch (error) {
      throw error;
    }
  }
}
