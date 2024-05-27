import {Response} from "express";
import {Octokit} from "@octokit/rest";
import responseHandler from "../helpers/responseHandler";
import {IFetchPrResponse} from "../@types/interfaces/githubResponse.interface"
import GenAIService from "./genAI.service";
import {decryptToken} from "../utils/secureToken";


class PullRequestsService {

    public static async fetchPrsService(res: Response,body:any) {
        const {githubAccessToken,repo} = body

        const token = decryptToken(githubAccessToken)
        const octokit = new Octokit({auth:token});

        const {data:user} = await octokit.request("GET /user")

        const {data:prs} = await octokit.request("GET /repos/{owner}/{repo}/pulls",{
            owner:user.login,
            repo:repo,
        })

        const prsList:IFetchPrResponse[]=[]

        prs.map((pr)=>{
            prsList.push( {
                numberId:pr.number,
                state:pr.state,
                message:`PR REQUEST : "${pr.title}" .This is a PR to merge changes from branch ${pr.head.ref} -> ${pr.base.ref} `,
                prTitle:pr.title,
                prBody:pr.body,
                head:{
                    branch:pr.head.ref,
                    user:pr.head.user?.login
                },
                base:{
                    branch:pr.base.ref,
                    user:pr.base.user?.login
                },
            })
        })

        return responseHandler(res,200,`PRs for ${repo} fetched successfully !`,{prs:prsList},prsList.length)
    }


    public static async fetchFilesFromPrService(res:Response,body:any){
        const {githubAccessToken,repo,pullNumber}=body
        const token = decryptToken(githubAccessToken)
        const octokit = new Octokit({auth:token});
        const {data:user} = await octokit.request("GET /user")

        const { data:prFiles} = await octokit.request('GET /repos/{owner}/{repo}/pulls/{pull_number}/files', {
                owner: user.login,
                repo: repo,
                pull_number: pullNumber,
                headers: {
                    'X-GitHub-Api-Version': '2022-11-28'
                }
            })

        return responseHandler(res,200,`Files for prs for repo ${repo} fetched successfully !`,{prFiles:prFiles})

    }

    public static async generateReviewForPrService (res:Response,body:any){
        const {githubAccessToken,repo,pullNumber,fileName}=body
        const token = decryptToken(githubAccessToken)
        const octokit = new Octokit({auth:token});
        const {data:user} = await octokit.request("GET /user")

        const { data:prFiles} = await octokit.request('GET /repos/{owner}/{repo}/pulls/{pull_number}/files', {
            owner: user.login,
            repo: repo,
            pull_number: pullNumber,
            headers: {
                'X-GitHub-Api-Version': '2022-11-28'
            }
        })
        const fileToReview = prFiles.filter((pr)=>{
            return pr.filename === fileName
        })

        const codeReview = await GenAIService.reviewPrChanges(fileToReview[0].patch)
        console.log(codeReview)
        return responseHandler(res,201,`Review generated !`,{prReview:codeReview})


    }

    public static async createReviewCommentService (res:Response,body:any){
        const {githubAccessToken,repo,pullNumber,fileName,commitId,comment}=body
        const token = decryptToken(githubAccessToken)
        const octokit = new Octokit({auth:token});
        const {data:user} = await octokit.request("GET /user")
        const username = user.login
      const response = await octokit.rest.pulls.createReviewComment({
            owner:username,
            repo,
            pull_number:pullNumber,
            body:comment,
            commit_id:commitId,
            path:fileName,
            subject_type:"file"

        })

        return responseHandler(res,201,`Comment added successfully !`)

    }


}

export default PullRequestsService;
