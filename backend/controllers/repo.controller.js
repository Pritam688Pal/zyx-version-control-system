const createRepo = (req, res) => {
	res.json("Repository created!");
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
