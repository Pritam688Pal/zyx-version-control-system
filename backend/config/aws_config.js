const AWS = require("aws-sdk");
require("dotenv").config();

// console.log("ACCESS_KEY:", process.env.AWS_ACCESS_KEY_ID);
// console.log(
// 	"SECRET_KEY:",
// 	process.env.AWS_SECRET_ACCESS_KEY ? "FOUND" : "MISSING",
// );
// console.log("REGION:", process.env.AWS_REGION);

AWS.config.update({
	accessKeyId: process.env.AWS_ACCESS_KEY_ID,
	secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
	region: process.env.AWS_REGION,
});

const s3 = new AWS.S3();
const S3_BUCKET = "zyxhub";

module.exports = { s3, S3_BUCKET };
