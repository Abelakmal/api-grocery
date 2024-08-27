import { PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt";

const prisma = new PrismaClient();

async function main() {
  const isExist = await prisma.admin.findUnique({
    where: {
      email: "admin@mail.com",
    },
  });
  if (!isExist) {
    await prisma.admin.create({
      data: {
        name: "admin",
        email: "admin@mail.com",
        password: await bcrypt.hash("admin123", 10),
        isSuper: true,
      },
    });
  }
}

main();
