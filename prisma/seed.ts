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

  const check_branch = await prisma.storeBranch.findMany({
    where: {
      name: "admin",
    },
  });

  if (check_branch.length < 1) {
    await prisma.storeBranch.create({
      data: {
        name: "admin",
        location: "Jakarta Pusat",
        latitude: "-6.186486",
        longitude: "106.834091",
      },
    });
  }
}

main();
