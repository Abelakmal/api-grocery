import { IUser, IUserResponse } from "../types/user.type";

export function excludeFields(data: IUser, keys: string[]): IUserResponse {
  return Object.fromEntries(
    Object.entries(data).filter(([key]) => !keys.includes(key))
  ) as IUserResponse;
}
