import {NextFunction,Request,Response} from "express";
import AuthService from "../services/auth.service";

class AuthController {

    public static async loginController(req:Request,res:Response,next:NextFunction):Promise<any> {
        try{
            const body = req.body
            await AuthService.loginService(res,body)
        }catch(err:any){
            next(err)
        }
    }

}

export default AuthController
