import { Router } from 'express'

import { ensureAuthentic } from '../middlewares/ensu-authentic'
import { DeliveriesoController } from '../controllers/deliveries-controller'
import { verifyUserAuthorizon } from '../middlewares/verifyUserAuthorizon'
import { DeliveryStatus } from '../controllers/delivery-status'


const deliveriesRoutes = Router()
const deliveriesController = new DeliveriesoController()
const deliveryStatus = new DeliveryStatus


deliveriesRoutes.use (ensureAuthentic, verifyUserAuthorizon(['sale']))
deliveriesRoutes.post("/", deliveriesController.create)
deliveriesRoutes.get("/", deliveriesController.index)

deliveriesRoutes.patch("/:id", deliveryStatus.update)

export { deliveriesRoutes }