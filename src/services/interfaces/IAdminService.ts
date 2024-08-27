import { IAdmin } from "../../types/admin.type";

export interface IAdminService {
  createService(admin: IAdmin,isSuper:boolean): Promise<void>;
  getCurrentService(id: number): Promise<IAdmin>;
  getService(isSuper:boolean): Promise<IAdmin[]>;
  updateService(id: number, admin: IAdmin,isSuper:boolean): Promise<IAdmin>;
  deleteService(id: number,isSuper:boolean): Promise<void>;
}
