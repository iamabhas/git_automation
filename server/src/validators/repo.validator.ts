import {body} from "express-validator"

export const githubRepoFileValidation = ()=>{
    return [
        body("repo").notEmpty().withMessage("Github Repo is required !"),
        body("repo").isString().withMessage("Github Repo must be a string !"),
        body("path").notEmpty().withMessage("File Path is required !"),
        body("path").isString().withMessage("File Path must be a string !"),

    ]
}
