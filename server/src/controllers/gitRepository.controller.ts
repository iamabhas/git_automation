import {NextFunction,Request,Response} from "express";
import GitRepositoryService from "../services/gitRepository.service";

class GitRepositoryController {

    public static async fetchAllReposController(req:Request,res:Response,next:NextFunction):Promise<any> {
        try{
            const body = req.body
            await GitRepositoryService.fetchAllReposService(res,body)
        }catch(err:any){
            next(err)
        }
    }

    public static async fetchFileFromRepoAndSummarizeController(req:Request,res:Response,next:NextFunction):Promise<any> {
        try{
            const body = req.body
            await GitRepositoryService.fetchFileFromRepoAndSummarizeService(res,body)
        }catch(err:any){
            next(err)
        }
    }

}

export default GitRepositoryController
