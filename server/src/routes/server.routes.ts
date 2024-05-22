import {Application, Response, Request, NextFunction} from "express";
import AppError from "../utils/appError.util";

import handleResponse from "../helpers/responseHandler";
import handleError from "../helpers/errorHandler";

import authRouter from "./auth.routes";
import gitRepositoryRouter from "./gitRepository.routes";

const initializeRoutes = (expressApplication: Application) => {
  console.log("Initialized Routes...!");

  // landing route
  expressApplication.get("/", (req:Request,res:Response) => {
    return handleResponse(res,200,"Git Automation")
  })

  //app  routes
  expressApplication.use("/api/",[
      authRouter,
      gitRepositoryRouter
  ])

  // error route
  expressApplication.all("*", (req:Request,res:Response,next:NextFunction) => {
    next(new AppError(`Cannot find ${req.originalUrl} on method ${req.method}`,404))
  })

  expressApplication.use((err: AppError, req: Request, res: Response,next:NextFunction) => {
    handleError(err, req, res,next);
  });

};

export default initializeRoutes;
