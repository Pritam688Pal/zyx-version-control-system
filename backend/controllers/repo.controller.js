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

const updateRepositoryById = async (req, res) => {
	const { id } = req.params;
	if (!id) return res.status(204).json("id required");
	const { content, description } = req.body;
	const userId = req.user._id;
	try {
		const repo = await Repo.findById(id);
		// console.log(repo.owner);
		// console.log(userId);
		if (!repo.owner.equals(userId))
			return res.status(401).json("Only owner can edit the repository");
		if (!content) return res.status(204).json("content required");
		repo.content.push(content);
		if (description) {
			repo.description = description;
		}
		repo.save();
		res.status(202).json({ message: "Repository updated!" });
	} catch (error) {
		console.error("Error during updating fetching : ", error.message);
		res.status(500).send("Server error");
	}
};

const toggleVisibilityById = async (req, res) => {
	const { id } = req.params;
	if (!id) return res.status(204).json("id required");
	const userId = req.user._id;
	try {
		const repo = await Repo.findById(id);
		// console.log(repo.owner);
		// console.log(userId);
		if (!repo.owner.equals(userId))
			return res
				.status(401)
				.json("Only owner can toggle visibility of the repository");
		repo.visibility = !repo.visibility;
		repo.save();
		res.status(202).json({ message: "Repository visibility toggled!" });
	} catch (error) {
		console.error("Error during updating fetching : ", error.message);
		res.status(500).send("Server error");
	}
};

const deleteRepositoryById = async (req, res) => {
	const { id } = req.params;
	if (!id) return res.status(204).json("id required");
	const userId = req.user._id;
	try {
		const repo = await Repo.findById(id);
		if (!repo.owner.equals(userId))
			return res.status(401).json("Only owner can delete the repository");
		await repo.deleteOne();
		// console.log(repo);
		res.status(202).json({ message: "Repository deleted!", repo });
	} catch (error) {
		console.error("Error during updating fetching : ", error.message);
		res.status(500).send("Server error");
	}
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
