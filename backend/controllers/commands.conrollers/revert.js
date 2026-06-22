const fs = require("fs");
const path = require("path");
const { promisify } = require("util");

const readDir = promisify(fs.readdir);
const copyFile = promisify(fs.copyFile);

async function revert(commitId) {
	const repoPath = path.resolve(process.cwd(), ".ZYXgit");
	const commitPath = path.join(repoPath, "commits");
	// console.log(commitPath);
	// console.log(commitId);
	try {
		const commitDir = path.join(commitPath, commitId);
		const files = await readDir(commitDir);
		const parentDir = path.resolve(repoPath, "..");
		for (const file of files) {
			await copyFile(path.join(commitDir, file), path.join(parentDir, file));
		}
		console.log(`Commit ${commitId} reverted successfully!`);
	} catch (error) {
		console.error("Unable to revert : ", error);
	}
}

module.exports = { revert };
