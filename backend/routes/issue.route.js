const issueRouter = require("express").Router();
const issueController = require("../controllers/issue.controller");

issueRouter.post("/create", issueController.createIssue);
issueRouter.put("/update", issueController.updateIssueById);
issueRouter.delete("/delete", issueController.deleteIssueById);
issueRouter.get("/all", issueController.getAllIssues);
issueRouter.get("/", issueController.getIssueById);

module.exports = issueRouter;
