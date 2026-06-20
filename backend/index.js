const yargs = require("yargs");

const { hideBin } = require("yargs/helpers");

const { initRepo } = require("./controllers/init.js");
const { addFiles } = require("./controllers/add.js");
const { commitFiles } = require("./controllers/commit.js");
const { push } = require("./controllers/push.js");
const { pull } = require("./controllers/pull.js");
const { revert } = require("./controllers/revert.js");

yargs(hideBin(process.argv))
    .command(
    "init",
    "Initialise a new repository",
    {},
    initRepo,
    )
    .command(
    "add <file>",
    "Add a file to the repository",
    ( yargs ) => {
        yargs.positional("file", {
            describe: "File to add to the staging area",
            type: "string"
        })
    },
    (argv) => {
        addFiles(argv.file);
    }
    )
    .command(
    "commit",
    "Commit the staged files",
    ( yargs ) => {
        yargs.positional("file", {
            describe: "Commit message",
            type: "string"
        })
    },
    commitFiles,
    )
    .command(
    "push",
    "Push commits to S3",
    {},
    push,
    )
    .command(
    "pull",
    "Pull commits from S3",
    {},
    pull,
    )
    .command(
    "revert",
    "Revert to a specific commit",
    ( yargs ) => {
        yargs.positional("file", {
            describe: "Comit ID to revert back to",
            type: "string"
        })
    },
    revert,
    )
    .demandCommand(1, "You need at least one command")
    .help().argv;
