const mongoose = require("mongoose");
const { Schema } = mongoose;

const issueSchema = new Schema({
	title: {
		type: String,
		required: true,
	},
	description: {
		type: String,
		required: true,
	},
	status: {
		type: Boolean,
		default: true,
	},
	repository: {
		type: Schema.Types.ObjectId,
		ref: "Repository",
		required: true,
	},
});

const Issue = mongoose.model("Issue", issueSchema);

module.exports = Issue;
