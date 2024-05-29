import {Response} from "express";
import {Octokit} from "@octokit/rest";
import responseHandler from "../helpers/responseHandler";
import {decryptToken, encryptToken} from "../utils/secureToken";

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

    public static async fetchProfileService(res: Response,body:any) {
        const {githubAccessToken} = body

        const token = decryptToken(githubAccessToken)
        const octokit = new Octokit({auth:token});

        const {data: {id,login,avatar_url,html_url,public_repos,followers,following,name,email}} = await octokit.request("GET /user")

        const responseData = {
            id,
            username:login,
            fullName:name,
            avatar:avatar_url,
            githubUrl:html_url,
            publicRepos:public_repos,
            followers,
            following,
            email

        }

        return responseHandler(res,200,`User profile data fetched successfully !`,responseData)
    }


}

export default AuthService;
