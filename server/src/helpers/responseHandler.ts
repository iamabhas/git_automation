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
        statusCode:`${statusCode} ${statusCodeMessages[statusCode] || "unknown" } `,
        status:handleStatus(statusCode),
        message:message,
    }

    if(data){
        responseJson.data=data
        responseJson.dataLength = length
    }

    return res.json(responseJson);
}

export default handleResponse
