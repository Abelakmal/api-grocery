import { ApiError } from "../../error/ApiError";
import { StoreBranchRepository } from "../../repository/prisma/StoreBranchRepository";
import { IStoreBranch } from "../../types/storeBranch.type";
import { IStoreBranchService } from "../interfaces/IStoreBranchService";

export class StoreBranchService implements IStoreBranchService {
  private storeBranchRepository: StoreBranchRepository;

  constructor() {
    this.storeBranchRepository = new StoreBranchRepository();
  }

  public async createService(
    storeBranch: IStoreBranch,
    isSuper: boolean
  ): Promise<void> {
    try {
      if (!isSuper) {
        throw new ApiError("Unauthorized", 401);
      }
      await this.storeBranchRepository.create(storeBranch);
    } catch (error) {
      throw error;
    }
  }

  public async getService(isSuper: boolean): Promise<IStoreBranch[]> {
    try {
      if (!isSuper) {
        throw new ApiError("Unauthorized", 401);
      }
      const result = await this.storeBranchRepository.get();
      return result;
    } catch (error) {
      throw error;
    }
  }

  public async getDetailService(id: number): Promise<IStoreBranch> {
    try {
      const result = await this.storeBranchRepository.getById(id);
      if (!result) {
        throw new ApiError("id is not found", 404);
      }
      return result;
    } catch (error) {
      throw error;
    }
  }

  public async updateService(
    id: number,
    storeBranch: IStoreBranch
  ): Promise<IStoreBranch> {
    try {
      const isExist = await this.storeBranchRepository.getById(id);
      if (!isExist) {
        throw new ApiError("id is not found", 404);
      }

      const result = await this.storeBranchRepository.update(id, storeBranch);
      return result;
    } catch (error) {
      throw error;
    }
  }

  public async deleteService(id: number): Promise<void> {
    try {
      const isExist = await this.storeBranchRepository.getById(id);
      if (!isExist) {
        throw new ApiError("id is not found", 404);
      }

      await this.storeBranchRepository.delete(id);
    } catch (error) {
      throw error;
    }
  }
}
