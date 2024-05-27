import {body} from "express-validator"

export const fetchPrsValidation = ()=>{
    return [
        body("repo").notEmpty().withMessage("Github Repo is required !"),
        body("repo").isString().withMessage("Github Repo must be a string !"),

    ]
}

export const fetchFilesFromPrValidation = ()=>{
    return [
        body("pullNumber").notEmpty().withMessage("Pull Number is required !"),
        body("pullNumber").isNumeric().withMessage("Pull Number must be a number !"),

    ]
}

export const generateReviewForPrValidation = ()=>{
    return [
        body("fileName").notEmpty().withMessage("File Name is required !"),
        body("fileName").isString().withMessage("File Name must be a string !"),

    ]
}

export const createReviewCommentValidation = ()=>{
    return [
        body("commitId").notEmpty().withMessage("Commit Id is required !"),
        body("commitId").isString().withMessage("Commit Id must be a string !"),
        body("comment").notEmpty().withMessage("Comment is required !"),
        body("comment").isString().withMessage("Comment must be a string !"),

    ]
}



