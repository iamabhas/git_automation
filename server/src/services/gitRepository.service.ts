import {Response} from "express";
import {Octokit} from "@octokit/rest";
import responseHandler from "../helpers/responseHandler";
import GenAIService from "./genAI.service";
import AppError from "../utils/appError.util";
import {decryptToken} from "../utils/secureToken";
class GitRepositoryService {

    public static async fetchAllReposService(res: Response,body:any) {
        const {githubAccessToken} = body
        const token = decryptToken(githubAccessToken)
        const octokit = new Octokit({auth:token});

        const {data:user} = await octokit.request("GET /user")
        const {data: repos} = await octokit.request('GET /users/{username}/repos', {
            username: user.login,
            headers: {
                'X-GitHub-Api-Version': '2022-11-28'
            }
        })
        const responseData = repos.map((repo) => {
            const data = {id:repo.id,repoName:repo.name,repoUrl:repo.html_url,accessType:repo.private}
            return data
        })

        return responseHandler(res,200,`Repos fetched successfully !`,responseData,responseData.length)
    }

    public static async fetchFileFromRepoAndSummarizeService(res:Response,body:any){
        const {githubAccessToken,repo,path} = body

        const token = decryptToken(githubAccessToken)
        const octokit = new Octokit({auth:token});

        const {data:user} = await octokit.request("GET /user")

        const { data: fileData } = await octokit.request(
            "GET /repos/{owner}/{repo}/contents/{path}",
            {
                owner: user.login,
                repo: repo,
                path: path,
            }
        );

        if (Array.isArray(fileData) || fileData.type !== "file") {
            throw new AppError("The specified path is not a file.",400)
        }


        const content = fileData.content
            ? Buffer.from(fileData.content, "base64").toString()
            : await GitRepositoryService.fetchFileContent(octokit, user.login, repo, path);

        const summary = await GenAIService.summarizeCode(content);
        const responseData = { "Code Summary": summary };
        return responseHandler(res, 200, `File from repo fetched successfully!`, responseData);
    }

    public static async fetchFileContent(octokit: Octokit, owner: string, repo: string, path: string): Promise<string> {
        const {data: fileContentData} = await octokit.request(
            "GET /repos/{owner}/{repo}/contents/{path}",
            {
                owner: owner,
                repo: repo,
                path: path,
                headers: {
                    Accept: "application/vnd.github.v3.raw"
                }
            }
        );

        return fileContentData as unknown as string;
    }
}

export default GitRepositoryService;
