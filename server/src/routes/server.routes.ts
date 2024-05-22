import {Application, Response, Request, NextFunction} from "express";
import handleResponse from "../helpers/responseHandler";
import authRoutes from "./auth.routes";
import handleError from "../helpers/errorHandler";
import AppError from "../utils/appError.util";


const initializeRoutes = (expressApplication: Application) => {
  console.log("Initialized Routes...!");

  // landing route
  expressApplication.get("/", (req:Request,res:Response) => {
    return handleResponse(res,200,"Git Automation")
  })

  //app  routes
  expressApplication.use("/api/",[
      authRoutes
  ])

  // error route
  expressApplication.all("*", (req:Request,res:Response,next:NextFunction) => {
    next(new AppError(`Cannot find ${req.originalUrl}`,404))
  })

  expressApplication.use((err: AppError, req: Request, res: Response, next: NextFunction) => {
    handleError(err, req, res, next);
  });

};

export default initializeRoutes;
