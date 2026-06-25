const Repo = require("../models/repo.model.js");

const createRepo = (req, res) => {
	const { name, issues, content, description, visibility } = req.body;
	// console.log(req.user);

	const owner = req.user._id;
	if (!name) {
		return res.status(400).json({ error: "Repository name is required!" });
	}
	try {
		const repo = Repo.create({
			name,
			description,
			content,
			owner,
			visibility,
			issues,
		});
		res.status(201).json({
			message: "Repository created!",
			repositoryID: repo._id,
		});
	} catch (error) {
		console.error("Error during repository creation : ", error.message);
		res.status(500).send("Server error");
	}
};

const getAllRepo = (req, res) => {
	res.json("All Repositories fetched!");
};

const getRepoById = (req, res) => {
	res.json("Repositories details fetched!");
};

const getRepoOfCrrentUser = (req, res) => {
	res.json("Repositories of loged in user fetched!");
};

const updateRepositoryById = (req, res) => {
	res.json("Repository updated!");
};

const toggleVisibilityById = (req, res) => {
	res.json("Visibility toggled!");
};

const deleteRepositoryById = (req, res) => {
	res.json("Repository deleted!");
};

module.exports = {
	createRepo,
	getAllRepo,
	getRepoById,
	getRepoOfCrrentUser,
	updateRepositoryById,
	toggleVisibilityById,
	deleteRepositoryById,
};
