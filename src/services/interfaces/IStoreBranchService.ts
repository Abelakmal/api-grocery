import { IStoreBranch } from "../../types/storeBranch.type";

export interface IStoreBranchService {
  createService(storeBranch: IStoreBranch,isSuper:boolean): Promise<void>;
  getService(isSuper:boolean): Promise<IStoreBranch[]>;
  getDetailService(id: number): Promise<IStoreBranch>;
  updateService(id: number, storeBranch: IStoreBranch): Promise<IStoreBranch>;
  deleteService(id: number): Promise<void>;
}
