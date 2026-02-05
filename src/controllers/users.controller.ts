
import { Request, Response } from "express"
import z from 'zod'
import {prisma} from '@/database/prisma'
import { hash } from 'bcrypt'
import { AppError } from '../utils/AppError'


class UsersController {
    async create(request: Request, response: Response){
        const bodySchema = z.object({
            name: z.string(),
            email: z.string().email(),
            password: z.string().min(6)
        })

        const {name, email, password} = bodySchema.parse(request.body)

        const userAlreadyExists = await prisma.user.findUnique({
            where: {
                email
            }
        })
        if(userAlreadyExists){
           throw       new AppError("User already exists!")
        }

        const hashedPassword = await hash(password, 8)

        const user = await prisma.user.create({
            data: {
                name,
                email,
                password: hashedPassword
            }
        })
        console.log(name, email, hashedPassword)

        const {password: _, ...userWithoutPass} = user

        return response.status(201).json(userWithoutPass)
    }
}

export {UsersController}