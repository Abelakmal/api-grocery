import { App } from "../../App";
import { expect, describe, it, beforeAll, afterAll } from "bun:test";
import request from "supertest";
import { prisma } from "../helper/prisma";

describe("User API", () => {
  let app: App;

  beforeAll(async() => {
    app = new App();
    await prisma.user.deleteMany({});
  });

  afterAll(async () => {
    await prisma.$disconnect()
  })

  it("should register a user succesfully", async () => {
    const response = await request(app.getApp()).post("/api/users").send({
      name: "test",
      email: "test@mail.com",
      password: "rahasia123",
    });
    expect(response.status).toBe(200);
    expect(response.body.data).toBe("ok");
  });
});
