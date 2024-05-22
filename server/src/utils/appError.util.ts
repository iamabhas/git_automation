import handleStatus from "../helpers/statusHandler";

class AppError extends Error {
    statusCode:number;
    status:string

    constructor(message:string,statusCode:number) {
        super(message);
        this.statusCode=statusCode
        this.status = handleStatus(statusCode)
        Error.captureStackTrace(this,this.constructor)
    }
}

export default AppError;
