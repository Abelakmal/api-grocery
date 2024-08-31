import { IUser, IUserResponse } from "../../types/user.type";
import { IUserService } from "../interfaces/IUserService";
import { ApiError } from "../../error/ApiError";
import { hashPassword } from "../../helper/bcrypt";
import { excludeFields } from "../../helper/excludeFields";
import { UserRepository } from "../../repository/prisma/UserRepository";

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

      if (user.dob) {
        user.dob = new Date(user.dob);
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

      const checkEmail = await this.userRepository.getUserByEmail(data.email);

      if (checkEmail && user.email !== data.email) {
        throw new ApiError("Email is already in use", 409);
      }

      const update: IUser = await this.userRepository.updateUserById(id, data);

      const result: IUserResponse = excludeFields(update, ["password"]);

      return result;
    } catch (error) {
      throw error;
    }
  }

  public async updateImgService(id: number, img: string): Promise<void> {
    try {
      const user = await this.userRepository.getUserById(id);
      if (!user) {
        throw new ApiError("User Id is not found", 404);
      }

      const image = `${process.env.API_URL}/media/${img}`;
      user.image = image;
      await this.userRepository.updateUserById(id, user);
    } catch (error) {
      throw error;
    }
  }

  public async updatePasswordService(
    email: string,
    password: string
  ): Promise<void> {
    try {
      const checkEmail = await this.userRepository.getUserByEmail(email);

      if (!checkEmail) {
        throw new ApiError("Email is not found", 404);
      }

      password = await hashPassword(password);

      await this.userRepository.updatePassword(email, password);
    } catch (error) {
      throw error;
    }
  }
}
