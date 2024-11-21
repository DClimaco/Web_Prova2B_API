import { Router } from "express";
import AuthController from "../controllers/AuthController";


const AuthRouter = Router()

AuthRouter.post("/auth/signin", AuthController.signIn)

export default AuthRouter;