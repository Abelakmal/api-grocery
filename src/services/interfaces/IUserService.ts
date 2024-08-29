import { IUser, IUserResponse } from "../../types/user.type";

export interface IUserService {
  registerService(user: IUser): Promise<void>;
  getService(id: number): Promise<IUserResponse>;
  updateService(id: number, data: IUser): Promise<IUserResponse>;
  updateImgService(id: number, img: string): Promise<void>;
  updatePasswordService(email: string, password: string): Promise<void>;
}
