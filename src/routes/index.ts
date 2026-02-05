import { Router } from "express";
import { usersRoutes } from "./users.routes";
import { sessionsRouters } from './sessions-routes'
import { deliveriesRoutes } from "./deliveries-routes";
import { DeliveryLogsRoutes } from './delivery-log'




const routes = Router()
routes.use("/users", usersRoutes)
routes.use("/sessions", sessionsRouters)
routes.use("/deliveries", deliveriesRoutes)

routes.use("/delivery-logs", DeliveryLogsRoutes)


export {routes}