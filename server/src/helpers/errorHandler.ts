import responseHandler from "./responseHandler";
import { Response, Request, NextFunction } from 'express';
import {statusConstants} from "../constants/status.constant";

const {ERROR}=statusConstants

interface ICustomError extends Error {
    statusCode: number;
    status: string;
}

const handleError = (err: ICustomError, req: Request, res: Response, next: NextFunction) => {
    err.statusCode = err.statusCode || 520;
    err.status = err.status || ERROR;
    return responseHandler(res, err.statusCode, err.message);
};

export default handleError;
