import { IAdmin } from "../../types/admin.type";
import { IResponse } from "../../types/general.type";

export interface IAdminService {
  createService(admin: IAdmin, isSuper: boolean): Promise<void>;
  getCurrentService(id: number): Promise<IAdmin>;
  getService(
    isSuper: boolean,
    page: number,
    pageSize: number
  ): Promise<IResponse<IAdmin>>;
  updateService(id: number, admin: IAdmin, isSuper: boolean): Promise<IAdmin>;
  deleteService(id: number, isSuper: boolean): Promise<void>;
}
