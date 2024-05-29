export interface IProfileData{
    id:number
    username:string
    fullName:string
    avatar:string
    githubUrl:string
    publicRepos: number
    followers: number
    following: number
    email: string | null
}

export interface IReposList{
    id:number
    repoName:string
    repoUrl:string
    accessType:boolean
}

export interface IPrList{
    numberId:number
    message:string
    state:string
    prTitle:string
    prBody:string | null
    head:{
        branch:string
        user:string | null | undefined
        sha:string
    }
    base:{
        branch:string
        user:string | null | undefined
        sha:string
    }

}

export interface IFilesList{
    additions: number
    blob_url: string
    changes: number
    contents_url: string
    deletions: number
    filename: string
    patch: string
    raw_url:string
    sha: string
    status: string
}
