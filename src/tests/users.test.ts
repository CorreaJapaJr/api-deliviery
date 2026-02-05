import request from 'supertest'
import { app } from '@/app'

describe("UsersController", ()=> {
    it("should create a new user", async () => {
        const response = await request(app).post('/users').send({
            name: "John Doe",
            email: "johndoe@example.com"
        })

        expect(response.status).toBe(201)
        console.log("há ")
    })
})
