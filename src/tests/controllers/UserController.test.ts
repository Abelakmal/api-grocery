import { App } from "../../App";
import { expect, describe, it, beforeAll, afterAll } from "bun:test";
import request from "supertest";
import { prisma } from "../helper/prisma";
import { hashPassword } from "../../helper/bcrypt";
import { createToken } from "../../helper/jwt";

describe("User API", () => {
  let app: App;
  let token: string;

  beforeAll(async () => {
    app = new App();
    await prisma.user.deleteMany({});

    const hashedPassword = await hashPassword("password123");
    const user = await prisma.user.create({
      data: {
        name: "admin",
        email: "admin@mail.com",
        password: "rahasia123",
      },
    });

    // Generate a JWT token
    token = createToken({ id: user.id });
  });

  afterAll(async () => {
    await prisma.$disconnect();
  });

  it("should register a user succesfully", async () => {
    const response = await request(app.getApp()).post("/api/users").send({
      name: "test",
      email: "test@mail.com",
      password: "rahasia123",
    });

    expect(response.status).toBe(200);
    expect(response.body.data).toBe("ok");
  });

  it("should get current user", async () => {
    const response = await request(app.getApp())
      .get("/api/users/current")
      .set("Authorization", `Bearer ${token}`);

    expect(response.status).toBe(200);
    expect(response.body.data).toHaveProperty("email", "admin@mail.com");
  });

  it("should return 401 for unauthenticated request", async () => {
    const response = await request(app.getApp()).get("/api/users/current");

    expect(response.status).toBe(401);
    expect(response.body).toHaveProperty(
      "error",
      "Authorization header is missing or malformed"
    );
  });
});
