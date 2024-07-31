import { ApiError } from "../../error/ApiError";
import { AddressRepository } from "../../repository/AddressRepository";
import { IAddress } from "../../types/address.type";
import { IAddressService } from "../interfaces/IAddressService";

export class AddressService implements IAddressService {
  private addressRepository: AddressRepository;
  constructor() {
    this.addressRepository = new AddressRepository();
  }
  public async createService(userId: number, address: IAddress): Promise<void> {
    try {
      const data = await this.addressRepository.create(address, userId);
      if (address.main) {
        await this.addressRepository.updateMain(data.id, userId);
      }
    } catch (error) {
      throw error;
    }
  }
  public async getService(userId: number): Promise<IAddress[]> {
    try {
      const data = await this.addressRepository.getByUserId(userId);

      return data;
    } catch (error) {
      throw error;
    }
  }

  public async updateMainService(userId: number, id: number): Promise<void> {
    try {
      const exist = await this.addressRepository.getById(id);
      if (!exist) {
        throw new ApiError("Id is not found", 404);
      }
      if (exist.userId !== userId) {
        throw new ApiError("unauthorized", 401);
      }
      await this.addressRepository.updateMain(id, userId);
    } catch (error) {
      throw error;
    }
  }

  public async updateService(
    id: number,
    userId: number,
    address: IAddress
  ): Promise<IAddress> {
    const exist = await this.addressRepository.getById(id);
    if (!exist) {
      throw new ApiError("Id is not found", 404);
    }
    if (exist.userId !== userId) {
      throw new ApiError("unauthorized", 401);
    }

    const result = await this.addressRepository.update(id, address);
    return result;
  }

  public async deleteService(userId: number, id: number): Promise<void> {
    try {
      const exist = await this.addressRepository.getById(id);
      if (!exist) {
        throw new ApiError("Id is not found", 404);
      }

      if (exist.userId !== userId) {
        throw new ApiError("unauthorized", 401);
      }

      await this.addressRepository.delete(id);
    } catch (error) {
      throw error;
    }
  }
}
