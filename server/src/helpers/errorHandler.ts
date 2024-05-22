import { Response, Request, NextFunction } from 'express';
import responseHandler from "./responseHandler";
import {statusConstants} from "../constants/status.constant";
import {ICustomError} from "../@types/interfaces/customError";
const {ERROR}=statusConstants

const handleError = (err: ICustomError, req: Request, res: Response, next: NextFunction) => {
    err.statusCode = err.statusCode || 520;
    err.status = err.status || ERROR;
    return responseHandler(res, err.statusCode, err.message);
};

export default handleError;
