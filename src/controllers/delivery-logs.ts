import { Request, Response } from 'express'
import { prisma } from '../database/prisma'
import z from 'zod'


class DeliveryLogs {
    async create(request: Request, response: Response) {
        const bodySchema = z.object({
            delivery_id: z.string(),
            description: z.string()
        })

        const { delivery_id, description } = bodySchema.parse(request.body)

        const deliveryLog = await prisma.delivery.findUnique({
            where: {
                id: delivery_id,
                description
            }
        })

        if (!deliveryLog) {
            return response.status(400).json({ error: "Delivery not found" })
        }

        if (deliveryLog.status
            === 'delivered') {
            return response.status(400).json({ error: "Delivery already delivered" })
        }

        if (deliveryLog.status === 'pending') {
            return response.status(400).json({ error: "Delivery already delivered" })
        }
     


    }



    async show(request: Request, response: Response) {
        const paramsSchema = z.object({
            delivery_id: z.string()
        })

        const { delivery_id } = paramsSchema.parse(request.params)

        const delivery = await prisma.delivery.findUnique({
            where: {
                id: delivery_id
            },
            include: {
                logs: true
            }

        })
        return response.json(delivery)
    }

}




export { DeliveryLogs }