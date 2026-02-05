import { Router } from 'express'
import { DeliveryLogs } from '../controllers/delivery-logs'
import { ensureAuthentic } from '../middlewares/ensu-authentic'
import { verifyUserAuthorizon } from '../middlewares/verifyUserAuthorizon'

export const DeliveryLogsRoutes = Router()
const deliveryLog = new DeliveryLogs()

DeliveryLogsRoutes.post("/",
    ensureAuthentic,
    verifyUserAuthorizon(["sale"]),
    deliveryLog.create)



DeliveryLogsRoutes.get("/:delivery_id/show",
    ensureAuthentic,
    verifyUserAuthorizon(["sale", "customer"]),
    deliveryLog.show
)