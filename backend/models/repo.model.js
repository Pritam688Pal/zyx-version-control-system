const mongoose = require("mongoose");
const { Schema } = mongoose;

const repoSchema = new Schema({
	name: {
		type: String,
		required: true,
		unique: true,
	},
	description: {
		type: String,
	},
	content: [
		{
			type: String,
		},
	],
	visibility: {
		type: Boolean,
		default: true,
	},
	owner: {
		type: Schema.Types.ObjectId,
		ref: "User",
		required: true,
	},
	issues: [
		{
			default: [],
			type: Schema.Types.ObjectId,
			ref: "Issue",
		},
	],
});

const Repo = mongoose.model("Repo", repoSchema);

module.exports = Repo;
