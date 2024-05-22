import {Response} from "express";
import {Octokit} from "@octokit/rest";
import responseHandler from "../helpers/responseHandler";
import GenAIService from "./genAI.service";

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

    public static async fetchFileFromRepoAndSummarizeService(res:Response,body:any){
        const {githubAccessToken,repo,path} = body

        const octokit = new Octokit({auth:githubAccessToken});

        const {data:user} = await octokit.request("GET /user")

        const { data: file } = await octokit.request(
            "GET /repos/{owner}/{repo}/contents/{path}",
            {
                owner: user.login,
                repo: repo,
                path: path,
            }
        );

        // const content = Buffer.from(file.content, "base64").toString();
        // const summary  = await GenAIService.summarizeCode(content)
        // const responseData = {"Code Summary":summary}
        // return responseHandler(res,200,`File from repo fetched successfully !`,responseData)
    }

}

export default GitRepositoryService;
