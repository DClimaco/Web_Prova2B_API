import { NextFunction, Response, Request } from "express";

class UserMiddleware{
    constructor(){

    }

    async analyseToken(req: Request, res: Response, next: NextFunction){
        const token = req.headers["authorization"];

        if(!token){
            return res.status(401).json({
                message: "Nenhum token autorizado."
            });
        }
        next();
    }
}

export default UserMiddleware;