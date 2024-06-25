import {describe, it,beforeAll, afterAll, expect} from "bun:test"
import request from "supertest"
import { App } from "../../App"
import { prisma } from "../helper/prisma"


describe("Testing for User Service", () => {
    let app:App
    beforeAll(async() => {
        app = new App()
        await prisma.user.deleteMany({})
        await prisma.user.create({
            data: {
                name : "test",
                email: "test@mail.com",
                password: "test12345678"
            }
        })
    })

    afterAll(async() => {
        await prisma.$disconnect()
    })

    it("should Email already exists" , async() => {
        const response =  await request(app.getApp()).post("/api/users").
        send({
            name : "test2",
            email: "test@mail.com",
            password: "test12345678"
        })

        expect(response.statusCode).toBe(400)
        expect(response.body.error).toBe("Email already exists")
        
    })
})