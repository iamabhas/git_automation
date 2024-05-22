import {Request,Response,NextFunction} from "express";
import AppError from "../utils/appError.util";

const validateToken=(req:Request,_:Response,next:NextFunction)=>{
    const {githubAccessToken} = req.body
    if(!githubAccessToken) {
        throw new AppError("Github access token is missing !",400);
    }
    next()
}

export default validateToken
