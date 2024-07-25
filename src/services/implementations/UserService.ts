import { UserRepository } from "../../repository/UserRepository";
import { IUser, IUserResponse } from "../../types/user.type";
import { IUserService } from "../interfaces/IUserService";
import { ApiError } from "../../error/ApiError";
import { hashPassword } from "../../helper/bcrypt";
import { excludeFields } from "../../helper/excludeFields";

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
    } catch (error) {
      throw error;
    }
  }

  public async getService(id: number): Promise<IUserResponse> {
    try {
      const user = await this.userRepository.getUserById(id);
      if (!user) {
        throw new ApiError("User is Not Found", 404);
      }
      const data: IUserResponse = excludeFields(user, ["password"]);
      return data;
    } catch (error) {
      throw error;
    }
  }

  public async updateService(id: number, data: IUser): Promise<IUserResponse> {
    try {
      const user = await this.userRepository.getUserById(id);

      if (!user) {
        throw new ApiError("User is Not Found", 404);
      }

      const checkEmail = await this.userRepository.getUserByEmail(data.email)

      if(checkEmail && user.email !== data.email){
        throw new ApiError("Email is already in use",409)
      }

      if (data.password) {
        data.password = await hashPassword(data.password);
      }

      const update: IUser = await this.userRepository.updateUserById(id, data);

      const result: IUserResponse = excludeFields(update, ["password"]);

      return result;
    } catch (error) {
      throw error;
    }
  }
}
