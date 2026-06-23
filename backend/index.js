const yargs = require("yargs");
const { hideBin } = require("yargs/helpers");
const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const http = require("http");
const { Server } = require("socket.io");

const { initRepo } = require("./controllers/commands.conrollers/init.js");
const { addFiles } = require("./controllers/commands.conrollers/add.js");
const { commitFiles } = require("./controllers/commands.conrollers/commit.js");
const { push } = require("./controllers/commands.conrollers/push.js");
const { pull } = require("./controllers/commands.conrollers/pull.js");
const { revert } = require("./controllers/commands.conrollers/revert.js");
const mainRouter = require("./routes/main.route.js");

dotenv.config();

yargs(hideBin(process.argv))
	.command("start", "starts a new server.", {}, startServer)
	.command("init", "Initialise a new repository", {}, initRepo)
	.command(
		"add <file>",
		"Add a file to the repository",
		(yargs) => {
			yargs.positional("file", {
				describe: "File to add to the staging area",
				type: "string",
			});
		},
		(argv) => {
			addFiles(argv.file);
		},
	)
	.command(
		"commit <message>",
		"Commit the staged files",
		(yargs) => {
			yargs.positional("message", {
				describe: "Commit message",
				type: "string",
			});
		},
		(argv) => {
			commitFiles(argv.message);
		},
	)
	.command("push", "Push commits to ZYXhub", {}, push)
	.command("pull", "Pull commits from ZYXhub", {}, pull)
	.command(
		"revert <commitID>",
		"Revert to a specific commit",
		(yargs) => {
			yargs.positional("commitID", {
				describe: "Comit ID to revert back to",
				type: "string",
			});
		},
		(argv) => {
			revert(argv.commitID);
		},
	)
	.demandCommand(1, "You need at least one command")
	.help().argv;

function startServer() {
	const app = express();
	const port = process.env.PORT;
	const mongoUri = process.env.MONGO_ATLAS_DB_URI;
	app.use(express.json());
	mongoose
		.connect(mongoUri)
		.then(() => console.log("MongoDB connected!"))
		.catch((err) => console.error("Unable to connect : ", err));
	app.use(cors({ origin: "*" }));
	app.use("/", mainRouter);
	let user;
	const httpServer = http.createServer(app);
	const io = new Server(httpServer, {
		cors: {
			origin: "*",
			methods: ["GET", "POST"],
		},
	});

	io.on("connection", (socket) => {
		socket.on("joinRoom", (userId) => {
			user = userID;
			console.log("=====");
			console.log(user);
			console.log("=====");
			socket.join(userID);
		});
	});

	const db = mongoose.connection;

	db.once("open", async () => {
		console.log("CRUD operations called");
	});

	httpServer.listen(port, () => {
		console.log(`Server is running on PORT ${port}`);
	});
}
