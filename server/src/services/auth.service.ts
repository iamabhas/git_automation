import {Response} from "express";
import {Octokit} from "@octokit/rest";
import responseHandler from "../helpers/responseHandler";
import AppError from "../utils/appError.util";

class AuthService {

    public static async loginService(res: Response,body:any) {
            const {githubAccessToken} = body
            if(!githubAccessToken) {
                throw new AppError("Github access token is missing !",400);
            }
            const octokit = new Octokit({auth:githubAccessToken});

            const {data:{login}} = await octokit.rest.users.getAuthenticated()

            const responseData = `Hello ${login}`
            return responseHandler(res,200,"Github access token valid . Successfully logged in !",responseData)
    }


}

export default AuthService;
