const fs = require("fs").promises;
const path = require("path");

async function addFiles(filePath) {
  const repoPath = path.resolve(process.cwd(), ".ZYXgit");
  const stagingPath = path.join(repoPath, "staging");
  try {
    await fs.mkdir(stagingPath, { recursive: true });
    const fileName = path.basename(filePath);
    await fs.copyFile(filePath, path.join(stagingPath, fileName));
    console.log(`File ${fileName} added to the staging area!`);
  } catch (error) {
    console.log("Error adding file : ", error);
  }
}

module.exports = { addFiles };
