import { UserRepository } from "../../repository/UserRepository"

export interface IAuthService {
    loginUserService (email: string, password: string) : Promise<Object>
}