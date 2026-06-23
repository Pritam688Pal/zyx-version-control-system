const express = require("express");
const mainRouter = express.Router();
const userRouter = require("./user.route.js");
const repoRouter = require("./repo.route.js");
const issueRouter = require("./issue.route.js");

mainRouter.use("/user", userRouter);
mainRouter.use("/repo", repoRouter);
mainRouter.use("/issue", issueRouter);

mainRouter.get("/", (req, res) => {
	res.json("Hello World!");
});

module.exports = mainRouter;
