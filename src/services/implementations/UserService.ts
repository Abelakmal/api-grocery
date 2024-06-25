import { UserRepository } from "../../repository/UserRepository";
import { IUser } from "../../types/user.type";
import { IUserService } from "../interfaces/IUserService";
import { ApiError } from "../../error/ApiError";
import { hashPassword } from "../../helper/bcrypt";

export class UserService implements IUserService {
  private userRepository: UserRepository;

  constructor() {
    this.userRepository = new UserRepository();
  }

  public async registerService(user: IUser): Promise<void> {
    try {
      const checkEmail = await this.userRepository.getUserByEmail(user.email);
      if (checkEmail) {
        throw new ApiError("Email already exists", 400);
      }

      user.password = await hashPassword(user.password);

      await this.userRepository.createUser(user);
    } catch (error: any) {
      throw error;
    }
  }
}
