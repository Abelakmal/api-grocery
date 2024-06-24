import request from "supertest";
import { App } from "../App";
import { expect, describe, it } from "bun:test";

const app = new App();

describe("GET /api/test", () => {
  it("should return ok", async () => {
    const response = await request(app.getApp()).get("/api/test");
    expect(response.status).toBe(200);
    expect(response.body.data).toBe("ok");
  });
});
