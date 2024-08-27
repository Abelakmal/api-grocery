export interface IAdmin {
  id: number;
  name: string;
  email: string;
  password: string;
  storeId: number | null;
  isSuper: boolean;
}

declare global {
  namespace Express {
    interface Request {
      admin?: {
        id: number;
        isSuper: boolean;
      };
    }
  }
}
