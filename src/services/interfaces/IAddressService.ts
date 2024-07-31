import { IAddress } from "../../types/address.type";

export interface IAddressService {
  createService(userId: number, address: IAddress): Promise<void>;
  getService(userId: number): Promise<IAddress[]>;
  updateService(
    id: number,
    userId: number,
    address: IAddress
  ): Promise<IAddress>;
  updateMainService(userId: number, id: number): Promise<void>;
  deleteService(userId: number, id: number): Promise<void>;
}
