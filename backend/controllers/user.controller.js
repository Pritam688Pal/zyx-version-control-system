const getAllUsers = (req, res) => {
	res.json("All users fetched");
};

const signUp = (req, res) => {
	res.json("Users signUp");
};

const logIn = (req, res) => {
	res.json("Users logIn");
};

const getUserProfile = (req, res) => {
	res.json("Profile fetced");
};

const updateUserProfile = (req, res) => {
	res.json("Profile updated");
};

const deleteUserProfile = (req, res) => {
	res.json("Profile deleted");
};

module.exports = {
	getAllUsers,
	signUp,
	logIn,
	getUserProfile,
	updateUserProfile,
	deleteUserProfile,
};
