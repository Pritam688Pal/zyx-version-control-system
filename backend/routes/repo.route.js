const repoRouter = require("express").Router();
const repoController = require("../controllers/repo.controller.js");
const verifyJWT = require("../middlewares/auth.middleware.js");

repoRouter.get("/", repoController.getRepoOfCrrentUser);
repoRouter.post("/create", verifyJWT, repoController.createRepo);
repoRouter.get("/allrepo", verifyJWT, repoController.getAllRepo);
repoRouter.get("/:id", verifyJWT, repoController.getRepoById);
repoRouter.put(
	"/updateRepositoryById/:id",
	verifyJWT,
	repoController.updateRepositoryById,
);
repoRouter.patch(
	"/toggleVisibility/:id",
	verifyJWT,
	repoController.toggleVisibilityById,
);
repoRouter.delete(
	"/delete/:id",
	verifyJWT,
	repoController.deleteRepositoryById,
);

module.exports = repoRouter;
