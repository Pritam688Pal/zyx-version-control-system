const Issue = require("../models/issue.model.js");
const Repo = require("../models/repo.model.js");

async function createIssue(req, res) {
	const { id } = req.params;
	if (!id) return res.status(204).json("Repo id required");
	const { title, description, status } = req.body;

	if (!title || !description) {
		return res
			.status(400)
			.json({ error: "Issue title/description is required!" });
	}
	try {
		const repository = await Repo.findById(id);
		const issue = await Issue.create({
			title,
			description,
			repository: repository._id,
		});
		if (!status) {
			issue.status = status;
			issue.save();
		}
		res.status(201).json({
			message: "Issue created!",
			issue: issue,
		});
	} catch (error) {
		console.error("Error during Issue creation : ", error.message);
		res.status(500).send("Server error");
	}
}

async function updateIssueById(req, res) {
	const { id } = req.params;
	if (!id) return res.status(204).json("Repo id required");
	const { title, description, status } = req.body;

	if (!title || !description) {
		return res
			.status(400)
			.json({ error: "Issue title/description is required!" });
	}
	try {
		const issue = await Issue.findById(id);
		if (!issue) {
			return res.status(400).json({ error: "Invalide issue id!" });
		}
		issue.title = title;
		issue.description = description;
		if (!status) {
			issue.status = status;
			issue.save();
		}
		res.status(201).json({
			message: "Issue updated!",
			issue: issue,
		});
	} catch (error) {
		console.error("Error during Issue updating : ", error.message);
		res.status(500).send("Server error");
	}
}

async function deleteIssueById(req, res) {
	const { id } = req.params;
	if (!id) return res.status(204).json("Repo id required");
	try {
		const issue = await Issue.findById(id);
		if (!issue) {
			return res.status(400).json({ error: "Invalide issue id!" });
		}
		await issue.deleteOne();
		res.status(201).json({
			message: "Issue deleted!",
			issue: issue,
		});
	} catch (error) {
		console.error("Error during Issue deketing : ", error.message);
		res.status(500).send("Server error");
	}
}

async function getAllIssues(req, res) {
	try {
		const issue = await Issue.find();
		res.status(302).json({
			issues: issue,
		});
	} catch (error) {
		console.error("Error during Issue deketing : ", error.message);
		res.status(500).send("Server error");
	}
}

async function getIssueById(req, res) {
	const { id } = req.params;
	if (!id) return res.status(204).json("Repo id required");
	try {
		const issue = await Issue.findById(id);
		if (!issue) {
			return res.status(400).json({ error: "Invalide issue id!" });
		}
		res.status(302).json({
			issues: issue,
		});
	} catch (error) {
		console.error("Error during Issue deketing : ", error.message);
		res.status(500).send("Server error");
	}
}

module.exports = {
	createIssue,
	updateIssueById,
	deleteIssueById,
	getAllIssues,
	getIssueById,
};
