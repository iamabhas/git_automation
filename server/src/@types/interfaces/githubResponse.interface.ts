export interface IFetchPrResponse{
    numberId:number,
    message:string,
    state:string,
        prTitle:string,
    prBody:string | null,
    head:{
        branch:string,
        user:string | null | undefined
        sha:string
    }
    base:{
        branch:string,
        user:string | null | undefined
        sha:string
    }

}
