import {Response} from "express";
import {Octokit} from "@octokit/rest";
import responseHandler from "../helpers/responseHandler";
import AppError from "../utils/appError.util";

class AuthService {

    public static async loginService(res: Response,body:any) {
            const {githubAccessToken} = body

            const octokit = new Octokit({auth:githubAccessToken});

            const {data:user} = await octokit.request("GET /user")

            return responseHandler(res,200,`Github access token valid . User ${user.login} successfully logged in !`)
    }


}

export default AuthService;
