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

const getAllRepo = async (req, res) => {
	try {
		const allrepo = await Repo.find({});
		res.status(201).json({
			message: "Repositories fetched!",
			repos: allrepo.filter((e) => e.visibility),
		});
	} catch (error) {
		console.error("Error during repository fetching : ", error.message);
		res.status(500).send("Server error");
	}
};

const getRepoById = async (req, res) => {
	const { id } = req.params;
	try {
		const repo = await Repo.findById(id).populate(
			"owner",
			"-password -repositories -starRepos -_id",
		);
		// .populate("issues");
		res.status(201).json({
			message: "Repository fetched!",
			repos: repo,
		});
	} catch (error) {
		console.error("Error during repository fetching : ", error.message);
		res.status(500).send("Server error");
	}
};

const getRepoOfCrrentUser = async (req, res) => {
	const owner = req.user._id;
	// console.log(owner);

	try {
		const repo = await Repo.find({ owner }).select("-owner");
		// .populate("issues");
		res.status(201).json({
			message: "Repository fetched!",
			repo: repo,
		});
	} catch (error) {
		console.error("Error during repository fetching : ", error.message);
		res.status(500).send("Server error");
	}
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
