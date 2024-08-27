import { IUser, IUserResponse } from "../types/user.type";

export function excludeFields(data: Object, keys: string[]): any {
  return Object.fromEntries(
    Object.entries(data).filter(([key]) => !keys.includes(key))
  ) as IUserResponse;
}
