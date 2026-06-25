const issueRouter = require("express").Router();
const issueController = require("../controllers/issue.controller");

issueRouter.post("/create/:id", issueController.createIssue);
issueRouter.put("/update/:id", issueController.updateIssueById);
issueRouter.delete("/delete/:id", issueController.deleteIssueById);
issueRouter.get("/all", issueController.getAllIssues);
issueRouter.get("/:id", issueController.getIssueById);

module.exports = issueRouter;
