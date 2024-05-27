import {Response} from "express";
import {Octokit} from "@octokit/rest";
import responseHandler from "../helpers/responseHandler";
import { encryptToken} from "../utils/secureToken";

class AuthService {

    public static async loginService(res: Response,body:any) {
            const {githubAccessToken} = body

            let token= ""
            const octokit = new Octokit({auth:githubAccessToken});
            const {data:user} = await octokit.request("GET /user")

        if(user){
                token = await encryptToken(githubAccessToken)
        }
            return responseHandler(res,200,`Github access token valid . User ${user.login} successfully logged in !`,{token})
    }


}

export default AuthService;
