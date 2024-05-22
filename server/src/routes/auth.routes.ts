import {Router} from "express";
import AuthController from "../controllers/auth.controller";
import validateToken from "../middlewares/tokenValidator.middleware";

const authRouter:Router = Router()

authRouter.post("/login",validateToken,AuthController.loginController)

export default  authRouter
