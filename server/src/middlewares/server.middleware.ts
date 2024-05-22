import express, { Application } from "express";
import cors from "cors";
import morganMiddleware from "./morgan.middleware";

const initializeMiddlewares = (expressApplication: Application) => {
  expressApplication.use(express.json());
  expressApplication.use(cors());
  expressApplication.use(morganMiddleware);
  console.log("Initialized Middlewares...!");
};

export default initializeMiddlewares;
