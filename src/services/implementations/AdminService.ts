import { ApiError } from "../../error/ApiError";
import { hashPassword } from "../../helper/bcrypt";
import { excludeFields } from "../../helper/excludeFields";
import { AdminRepository } from "../../repository/prisma/AdminRepository";
import { IAdmin } from "../../types/admin.type";
import { IResponse } from "../../types/general.type";
import { IAdminService } from "../interfaces/IAdminService";

export class AdminService implements IAdminService {
  private adminRepository: AdminRepository;

  constructor() {
    this.adminRepository = new AdminRepository();
  }

  public async createService(admin: IAdmin, isSuper: boolean): Promise<void> {
    try {
      if (!isSuper) {
        throw new ApiError("Unauthorized", 401);
      }
      const checkEmail = await this.adminRepository.getByEmail(admin.email);
      if (checkEmail) {
        throw new ApiError("Email already exists", 400);
      }
      admin.password = await hashPassword(admin.password as string);
      await this.adminRepository.create(admin);
    } catch (error) {
      throw error;
    }
  }

  public async getService(
    isSuper: boolean,
    page: number,
    pageSize: number
  ): Promise<IResponse<IAdmin>> {
    try {
      if (!isSuper) {
        throw new ApiError("Unauthorized", 401);
      }
      const skip = (page - 1) * pageSize;
      const data = await this.adminRepository.get(skip, pageSize);
      return {
        total: data.length,
        skip,
        limit: pageSize,
        data,
      };
    } catch (error) {
      throw error;
    }
  }

  public async getCurrentService(id: number): Promise<IAdmin> {
    try {
      const data = await this.adminRepository.getById(id);
      if (!data) {
        throw new ApiError("Unauthorized", 401);
      }

      const result = excludeFields(data, ["password"]);
      return result;
    } catch (error) {
      throw error;
    }
  }

  public async updateService(
    id: number,
    admin: IAdmin,
    isSuper: boolean
  ): Promise<IAdmin> {
    try {
      if (!isSuper) {
        throw new ApiError("Unauthorized", 401);
      }
      const isExist = await this.adminRepository.getById(id);
      if (!isExist) {
        throw new ApiError("id is not found", 404);
      }
      const data = await this.adminRepository.update(id, admin);
      return data;
    } catch (error) {
      throw error;
    }
  }

  public async deleteService(id: number, isSuper: boolean): Promise<void> {
    try {
      if (!isSuper) {
        throw new ApiError("Unauthorized", 401);
      }
      await this.adminRepository.delete(id);
    } catch (error) {
      throw error;
    }
  }
}
