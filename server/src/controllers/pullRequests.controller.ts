import {NextFunction,Request,Response} from "express";
import PullRequestsService from "../services/pullRequests.service";

class PullRequestsController {

    public static async fetchPrsController(req:Request,res:Response,next:NextFunction):Promise<any> {
        try{
            const body = req.body
            await PullRequestsService.fetchPrsService(res,body)
        }catch(err:any){
            next(err)
        }
    }

    public static async fetchFilesFromPrController(req:Request,res:Response,next:NextFunction):Promise<any> {
        try{
            const body = req.body
            await PullRequestsService.fetchFilesFromPrService(res,body)
        }catch(err:any){
            next(err)
        }
    }

    public static async generateReviewForPrController(req:Request,res:Response,next:NextFunction):Promise<any> {
        try{
            const body = req.body
            await PullRequestsService.generateReviewForPrService(res,body)
        }catch(err:any){
            next(err)
        }
    }

    public static async createReviewCommentController(req:Request,res:Response,next:NextFunction):Promise<any> {
        try{
            const body = req.body
            await PullRequestsService.createReviewCommentService(res,body)
        }catch(err:any){
            next(err)
        }
    }

    public static async reviewAllFileForPrController(req:Request,res:Response,next:NextFunction):Promise<any> {
        try{
            const body = req.body
            await PullRequestsService.reviewAllFilesForPrService(res,body)
        }catch(err:any){
            next(err)
        }
    }

    public static async fetchAllReviewsController(req:Request,res:Response,next:NextFunction):Promise<any> {
        try{
            const body = req.body
            await PullRequestsService.fetchAllReviewsService(res,body)
        }catch(err:any){
            next(err)
        }
    }

}

export default PullRequestsController
