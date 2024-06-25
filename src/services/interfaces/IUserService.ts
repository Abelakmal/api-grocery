import { IUser, IUserResponse } from "../../types/user.type";

export interface IUserService {
    registerService(user:IUser): Promise<void>;
    getService(id:number): Promise<IUserResponse>;
}