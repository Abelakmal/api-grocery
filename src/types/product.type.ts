import { UnitWeight } from "@prisma/client";
export interface IProduct {
  id: number;
  name: string;
  description: string;
  weight: number;
  unitWeight: UnitWeight;
  image: string;
  price: bigint;
  categoryId: number;
  createdAt: Date;
  updatedAt: Date;
}
