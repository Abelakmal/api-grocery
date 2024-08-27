import { PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt";

const prisma = new PrismaClient();

async function main() {
  await prisma.admin.create({
    data: {
      name: "admin",
      email: "admin@mail.com",
      password: await bcrypt.hash("admin123", 10),
      isSuper: true
    },
  });

}

main();
