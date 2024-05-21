import {Response} from "express";
import {IResponseJson} from "../@types/interfaces/responseJson";
import {statusCodeMessages} from "../constants/status.constant";
import handleStatus from "./statusHandler";

const handleResponse = (
    res:Response,
    statusCode:number,
    message:string,
    data:any=null,
    length:any=null
)=>{

    const responseJson:IResponseJson={
        status:`${handleStatus(statusCode)} | ${statusCodeMessages[statusCode] || "unknown"}`,
        message:message,
    }

    if(data){
        responseJson.data=data
        responseJson.dataLength = length
    }

    return res.status(statusCode).json(responseJson);
}

export default handleResponse
