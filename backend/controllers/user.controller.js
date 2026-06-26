const User = require("../models/user.model.js");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const signUp = async (req, res) => {
	const { username, email, password } = req.body;
	try {
		const user = await User.findOne({ username });
		if (user) return res.status(400).json({ message: "User already exists!" });
		const salt = await bcrypt.genSalt(10);
		const hashedPassword = await bcrypt.hash(password, salt);
		const newUser = await User.create({
			username,
			email,
			password: hashedPassword,
		});
		const accessToken = newUser.generateAccessToken();
		const refreshToken = newUser.generateRefreshToken();
		res
			.status(200)
			.cookie("accessToken", accessToken)
			.cookie("refreshToken", refreshToken)
			.json({ user: newUser });
	} catch (error) {
		console.error("Error during signing up : ", errerror?.messageor);
		res.status(500).json("Server error");
	}
};

const logIn = async (req, res) => {
	const { email, password } = req.body;
	try {
		const user = await User.findOne({ email });
		if (!user) return res.status(400).json({ message: "Invalid credentials!" });
		const isMatched = await bcrypt.compare(password, user.password);
		if (!isMatched)
			return res.status(400).json({ message: "Invalid credentials!" });
		const accessToken = user.generateAccessToken();
		const refreshToken = user.generateRefreshToken();
		res
			.status(200)
			.cookie("accessToken", accessToken)
			.cookie("refreshToken", refreshToken)
			.json("User Logged In");
	} catch (error) {
		console.error("Error during logging in : ", error?.message);
		res.status(500).json("Server error");
	}
};

const getAllUsers = async (req, res) => {
	try {
		const allUsers = await User.find({}).select("-password");
		res.json(allUsers);
	} catch (error) {
		console.error("Error during getting all user : ", error?.message);
		res.status(500).json("Server error");
	}
};

const getUserProfile = async (req, res) => {
	const user = req.user;
	res.json(user);
};

const updateUserProfile = async (req, res) => {
	const { email, password } = req.body;
	const user = req.user;
	try {
		let updateFields = { email };
		if (password) {
			const salt = await bcrypt.genSalt(10);
			const hashedPassword = await bcrypt.hash(password, salt);
			updateFields.password = hashedPassword;
		}
		const result = await User.findOneAndUpdate(
			{
				_id: user._id,
			},
			{ $set: updateFields },
			{ returnDocument: "after" },
		).select("-password");

		if (!result) {
			return res.status(404).json({ message: "User not found!" });
		}
		res.json({ result, message: "Profile updated!" });
	} catch (error) {
		console.error("Error during updating user profile : ", error?.message);
		res.status(500).json("Server error");
	}
};

const deleteUserProfile = async (req, res) => {
	const user = req.user;
	try {
		const result = await User.findOneAndDelete({
			_id: user._id,
		}).select("-password");
		if (!result) {
			return res.status(404).json({ message: "User not found!" });
		}
		res
			.clearCookie("accessToken")
			.clearCookie("refreshToken")
			.json({ result, message: "Profile deleted!" });
	} catch (error) {
		console.error("Error during deleting user profile : ", error?.message);
		res.status(500).json("Server error");
	}
};

const refreshAccessToken = async (req, res) => {
	try {
		const refreshToken = req.cookies?.refreshToken;
		if (!refreshToken) return res.status(401).json("Unauthorized request");
		const decodedToken = jwt.verify(
			refreshToken,
			process.env.REFRESH_TOKEN_SECRET,
		);
		const user = await User.findById(decodedToken?._id);
		const accessToken = user.generateAccessToken();
		res
			.status(200)
			.cookie("accessToken", accessToken)
			.json("Access Token refreshed");
	} catch (error) {
		console.error("Error during refreshing access token : ", error?.message);
		res.status(500).json("Server error");
	}
};

module.exports = {
	getAllUsers,
	signUp,
	logIn,
	getUserProfile,
	updateUserProfile,
	deleteUserProfile,
	refreshAccessToken,
};
