import { Application,Response } from "express";
import handleResponse from "../helpers/responseHandler";
const initializeRoutes = (expressApplication: Application) => {
  console.log("Initialized Routes...!");
  expressApplication.get("/", (_:any, res:Response) => {
    handleResponse(res,200,"Git Automation")
  })
};

export default initializeRoutes;
