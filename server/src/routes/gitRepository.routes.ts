import {Router} from "express";
import GitRepositoryController from "../controllers/gitRepository.controller";
import validateToken from "../middlewares/tokenValidator.middleware";

const gitRepositoryRouter:Router = Router()

gitRepositoryRouter.get("/repo/fetch-all",validateToken,GitRepositoryController.fetchAllReposController)

export default  gitRepositoryRouter
