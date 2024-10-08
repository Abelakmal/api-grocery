import { PrismaClient } from "@prisma/client";
import { IAddress } from "../../types/address.type";

export class AddressRepository {
  private prisma: PrismaClient;

  constructor() {
    this.prisma = new PrismaClient();
  }

  public async create(data: IAddress, userId: number): Promise<IAddress> {
    try {
      const {
        details,
        label,
        latitude,
        location,
        longitude,
        main,
        recipient_name,
        recipient_number,
      } = data;
      const result = await this.prisma.address.create({
        data: {
          details,
          label,
          latitude,
          location,
          longitude,
          main,
          recipient_name,
          recipient_number,
          userId,
        },
      });
      return result;
    } catch (error) {
      throw error;
    }
  }

  public async getByUserId(userId: number): Promise<IAddress[]> {
    try {
      const data = await this.prisma.address.findMany({
        where: {
          is_delete: false,
          userId,
        },
        orderBy: [
          {
            main: "desc",
          },
        ],
      });
      return data;
    } catch (error) {
      throw error;
    }
  }

  public async getById(id: number): Promise<IAddress | null> {
    try {
      const data = await this.prisma.address.findUnique({
        where: {
          is_delete: false,
          id,
        },
      });
      return data;
    } catch (error) {
      throw error;
    }
  }

  public async getByMain(userId: number): Promise<IAddress | null> {
    try {
      const data = await this.prisma.address.findFirst({
        where: {
          is_delete: false,
          AND: [{ userId }, { main: true }],
        },
      });
      return data;
    } catch (error) {
      throw error;
    }
  }
  public async updateMain(id: number, userId: number): Promise<void> {
    try {
      await this.prisma.$transaction([
        this.prisma.address.updateMany({
          where: {
            is_delete: false,
            userId,
            main: true,
          },
          data: {
            main: false,
          },
        }),

        this.prisma.address.update({
          where: {
            is_delete: false,
            id,
          },
          data: {
            main: true,
          },
        }),
      ]);
    } catch (error) {
      throw error;
    }
  }

  public async update(id: number, data: IAddress): Promise<IAddress> {
    try {
      const {
        label,
        details,
        latitude,
        longitude,
        recipient_name,
        recipient_number,
      } = data;
      const result = await this.prisma.address.update({
        where: {
          is_delete: false,
          id,
        },
        data: {
          label,
          details,
          latitude,
          longitude,
          recipient_name,
          recipient_number,
        },
      });
      return result;
    } catch (error) {
      throw error;
    }
  }

  public async delete(id: number): Promise<void> {
    try {
      await this.prisma.address.update({
        where: {
          id,
        },
        data: {
          is_delete: true,
        },
      });
    } catch (error) {
      throw error;
    }
  }
}
