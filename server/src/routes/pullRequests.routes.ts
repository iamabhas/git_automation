import {Router} from "express";
import PullRequestsController from "../controllers/pullRequests.controller";
import validateToken from "../middlewares/tokenValidator.middleware";
import {
    fetchPrsValidation,
    fetchFilesFromPrValidation,
    generateReviewForPrValidation, createReviewCommentValidation
} from "../validators/prs.validator";
import {validateBody} from "../middlewares/validation.middleware";

const pullRequestsRouter:Router = Router()

pullRequestsRouter.get("/prs/fetch-prs",validateToken,fetchPrsValidation(),validateBody,PullRequestsController.fetchPrsController)

pullRequestsRouter.get("/prs/fetch-pr-files",validateToken,fetchPrsValidation(),fetchFilesFromPrValidation(),validateBody,PullRequestsController.fetchFilesFromPrController)

pullRequestsRouter.get("/prs/generate-review",validateToken,fetchPrsValidation(),fetchFilesFromPrValidation(),generateReviewForPrValidation(),validateBody,PullRequestsController.generateReviewForPrController)

pullRequestsRouter.post("/prs/create-review-comment",validateToken,fetchPrsValidation(),fetchFilesFromPrValidation(),generateReviewForPrValidation(),createReviewCommentValidation(),validateBody,PullRequestsController.createReviewCommentController)

export default  pullRequestsRouter
