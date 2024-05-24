import {Router} from "express";
import GitRepositoryController from "../controllers/gitRepository.controller";
import validateToken from "../middlewares/tokenValidator.middleware";
import {githubRepoFileValidation} from "../validators/repo.validator";
import {validateBody} from "../middlewares/validation.middleware";
const gitRepositoryRouter:Router = Router()

gitRepositoryRouter.get("/repo/fetch-all",validateToken,GitRepositoryController.fetchAllReposController)

gitRepositoryRouter.get("/repo/fetch-file-from-repo",validateToken,githubRepoFileValidation(),validateBody,GitRepositoryController.fetchFileFromRepoAndSummarizeController)

export default  gitRepositoryRouter
