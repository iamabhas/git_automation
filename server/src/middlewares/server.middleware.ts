import express, { Application } from "express";
import cors from "cors";
import morganMiddleware from "./morgan.middleware";

const initializeMiddlewares = (expressApplication: Application) => {
  expressApplication.use(cors());
  expressApplication.use(express.json());
  expressApplication.use(morganMiddleware);
};

export default initializeMiddlewares;
