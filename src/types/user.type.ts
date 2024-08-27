export interface IUser {
  id: number;
  name: string;
  dob: Date;
  email: string;
  phone: string;
  address: string;
  password: string;
  image: string;
}

export interface IUserResponse {
  id: number;
  name: string;
  dob: Date;
  email: string;
  phone: number;
  address: string;
}
export interface IFilter {
  category1?: number;
  category2?: number;
  category3?: number;
}

declare global {
  namespace Express {
    interface Request {
      user?: {
        id: number;
      };
    }
  }
}
