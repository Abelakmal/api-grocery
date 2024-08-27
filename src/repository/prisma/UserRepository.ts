import { PrismaClient } from "@prisma/client";
import { IUser } from "../../types/user.type";

export class UserRepository {
  private prisma: PrismaClient;

  constructor() {
    this.prisma = new PrismaClient();
  }

  public async createUser(user: IUser): Promise<void> {
    try {
      await this.prisma.user.create({
        data: user,
      });
    } catch (error) {
      throw error;
    }
  }

  public async getUserByEmail(email: string): Promise<IUser> {
    try {
      const data = await this.prisma.user.findUnique({
        where: {
          email,
        },
      });
      return data as IUser;
    } catch (error) {
      throw error;
    }
  }

  public async getUserByPhone(phone: string): Promise<IUser | null> {
    try {
      const data = await this.prisma.user.findUnique({
        where: {
          phone,
        },
      });
      return data as IUser | null;
    } catch (error) {
      throw error;
    }
  }

  public async getUserById(id: number): Promise<IUser | null> {
    try {
      const data = await this.prisma.user.findUnique({
        where: {
          id,
        },
      });

      return data as IUser | null;
    } catch (error) {
      throw error;
    }
  }

  public async updateUserById(id: number, data: IUser): Promise<IUser> {
    try {
      const result = await this.prisma.user.update({
        where: {
          id,
        },
        data,
      });
      return result as IUser;
    } catch (error) {
      throw error;
    }
  }
}
