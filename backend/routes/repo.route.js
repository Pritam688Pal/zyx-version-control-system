const repoRouter = require("express").Router();
const repoController = require("../controllers/repo.controller.js");

repoRouter.get("/", repoController.getRepoOfCrrentUser);
repoRouter.post("/create", repoController.createRepo);
repoRouter.get("/allrepo", repoController.getAllRepo);
repoRouter.get("/getbyId", repoController.getRepoById);
repoRouter.put("/updateRepositoryById", repoController.updateRepositoryById);
repoRouter.patch("/toggleVisibility", repoController.toggleVisibilityById);
repoRouter.delete("/delete", repoController.deleteRepositoryById);

module.exports = repoRouter;
