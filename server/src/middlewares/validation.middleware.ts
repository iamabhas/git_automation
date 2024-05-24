import { validationResult} from "express-validator";
import {Request,Response,NextFunction} from "express";
import responseHandler from "../helpers/responseHandler";

export const validateBody = (req: Request, res: Response, next: NextFunction) => {

    const validationErrors = validationResult(req);
    if (validationErrors.isEmpty()) return next();
    const errors:[string] [] = [];
    validationErrors.array().map((err)=>{
        errors.push(err.msg)
    })

    return responseHandler(res,400,"Request Body Errors",{
        errors:errors
    })


}

