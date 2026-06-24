const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const { Schema } = mongoose;

const userSchema = new Schema({
	username: {
		type: String,
		required: true,
		unique: true,
	},
	email: {
		type: String,
		required: true,
		unique: true,
	},
	password: {
		type: String,
	},
	repositories: [
		{
			default: [],
			type: Schema.Types.ObjectId,
			ref: "Repository",
		},
	],
	followedUsers: [
		{
			default: [],
			type: Schema.Types.ObjectId,
			ref: "User",
		},
	],
	starRepos: [
		{
			default: [],
			type: Schema.Types.ObjectId,
			ref: "Repository",
		},
	],
});

userSchema.methods.generateAccessToken = function () {
	return jwt.sign(
		{
			_id: this._id,
			email: this.email,
			username: this.username,
		},
		process.env.ACCESS_TOKEN_SECRET,
		{
			expiresIn: process.env.ACCESS_TOKEN_EXPIRY,
		},
	);
};

userSchema.methods.generateRefreshToken = function () {
	return jwt.sign(
		{
			_id: this._id,
		},
		process.env.REFRESH_TOKEN_SECRET,
		{
			expiresIn: process.env.REFRESH_TOKEN_EXPIRY,
		},
	);
};

const User = mongoose.model("User", userSchema);

module.exports = User;
