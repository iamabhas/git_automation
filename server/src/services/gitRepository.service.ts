import {Response} from "express";
import {Octokit} from "@octokit/rest";
import responseHandler from "../helpers/responseHandler";

class GitRepositoryService {

    public static async fetchAllReposService(res: Response,body:any) {
        const {githubAccessToken} = body

        const octokit = new Octokit({auth:githubAccessToken});

        const {data:user} = await octokit.request("GET /user")
        const {data: repos} = await octokit.request('GET /users/{username}/repos', {
            username: user.login,
            headers: {
                'X-GitHub-Api-Version': '2022-11-28'
            }
        })
        const responseData = repos.map((repo) => repo.name)

        return responseHandler(res,200,`Repos fetched successfully !`,responseData,responseData.length)
    }


}

export default GitRepositoryService;
