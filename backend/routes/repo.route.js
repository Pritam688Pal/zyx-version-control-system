const repoRouter = require("express").Router();
const repoController = require("../controllers/repo.controller.js");
const verifyJWT = require("../middlewares/auth.middleware.js");

repoRouter.get("/", verifyJWT, repoController.getRepoOfCrrentUser);
repoRouter.post("/create", verifyJWT, repoController.createRepo);
repoRouter.get("/allrepo", verifyJWT, repoController.getAllRepo);
repoRouter.get("/getbyId", verifyJWT, repoController.getRepoById);
repoRouter.put(
	"/updateRepositoryById",
	verifyJWT,
	repoController.updateRepositoryById,
);
repoRouter.patch(
	"/toggleVisibility",
	verifyJWT,
	repoController.toggleVisibilityById,
);
repoRouter.delete("/delete", verifyJWT, repoController.deleteRepositoryById);

module.exports = repoRouter;
