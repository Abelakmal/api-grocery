import {describe, it,beforeAll, afterAll, expect} from "bun:test"
import request from "supertest"
import { App } from "../../App"
import { prisma } from "../helper/prisma"


describe("Testing for Auth Service", () => {
    let app:App
    beforeAll(async() => {
        app = new App()
        await prisma.user.deleteMany({})
    })

    afterAll(async() => {
        await prisma.$disconnect()
    })

    it("should Email or Password is Wrong" , async() => {
        const response =  await request(app.getApp()).post("/api/auth/login-users").
        send({
            email: "test@mail.com",
            password: "test12345678"
        })

        expect(response.statusCode).toBe(401)
        expect(response.body.error).toBe("Email or Password is wrong")
        
    })
})