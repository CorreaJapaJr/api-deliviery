import { Request, Response, NextFunction } from 'express';
import { AppError } from '../utils/AppError'


function verifyUserAuthorizon(role: string[]){
    return (req: Request, res: Response, next: NextFunction) => {
        if(!req.user){
            throw new AppError("User not found", 401)
        }

        if(!role.includes(req.user.role)){
            throw new AppError("Insufficient permission", 401)
        }

        return next()
    }
}

export { verifyUserAuthorizon }