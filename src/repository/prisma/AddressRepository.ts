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
        label,
        details,
        latitude,
        longitude,
        recipient_name,
        recipient_number,
      } = data;
      const result = await this.prisma.address.create({
        data: {
          label,
          details,
          latitude,
          longitude,
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
          id,
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
            userId,
            main: true,
          },
          data: {
            main: false,
          },
        }),

        this.prisma.address.update({
          where: {
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
      await this.prisma.address.delete({
        where: {
          id,
        },
      });
    } catch (error) {
      throw error;
    }
  }
}
