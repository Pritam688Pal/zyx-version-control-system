const jwt = require("jsonwebtoken");
const User = require("../models/user.model.js");

module.exports = async (req, res, next) => {
	try {
		const token = req.cookies?.accessToken;

		if (!token) return res.status(401).json("Unauthorized request");
		const decodedToken = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
		const user = await User.findById(decodedToken?._id).select("-password");
		if (!user) return res.status(401).json("Invalid Access Token");
		req.user = user;
		next();
	} catch (error) {
		res.status(500).json(error?.message || "Internal Server error");
	}
};
