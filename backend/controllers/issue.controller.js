function createIssue(req, res) {
	res.json("Issue created");
}

function updateIssueById(req, res) {
	res.json("Issue updated");
}

function deleteIssueById(req, res) {
	res.json("Issue deleted");
}

function getAllIssues(req, res) {
	res.json("all Issue fetced");
}

function getIssueById(req, res) {
	res.json("Issue fetched");
}

module.exports = {
	createIssue,
	updateIssueById,
	deleteIssueById,
	getAllIssues,
	getIssueById,
};
