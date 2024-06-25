export interface IUser {
  id: number;
  name: string;
  dob: Date;
  email: string;
  phone: number;
  address: string;
  password: string;
}


export interface IUserResponse {
  id: number;
  name: string;
  dob: Date;
  email: string;
  phone: number;
  address: string;
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