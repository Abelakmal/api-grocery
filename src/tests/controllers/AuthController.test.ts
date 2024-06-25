import { App } from "../../App";
import { expect, describe, it, beforeAll, afterAll } from "bun:test";
import request from "supertest";
import { prisma } from "../helper/prisma";

describe("Auth API", () => {
  let app: App;

  beforeAll(async () => {
    app = new App();
    await prisma.user.deleteMany({});
    await prisma.user.create({
      data: {
        name: "test",
        email: "test@mail.com",
        password: "rahasia123",
      },
    });
  });

  afterAll(async () => {
    await prisma.$disconnect();
  });

  it("should login a user succesfully", async () => {
    const response = await request(app.getApp()).post("/api/auth/login-users").send({
      email: "test@mail.com",
      password: "rahasia123",
    });
    expect(response.status).toBe(200);
    expect(response.body.data).toHaveProperty("token")
  });
});
