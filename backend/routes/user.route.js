const express = require("express");
const userController = require("../controllers/user.controller.js");
const userRouter = express.Router();
const verifyJWT = require("../middlewares/auth.middleware.js");

userRouter.get("/allUsers", verifyJWT, userController.getAllUsers);
userRouter.post("/signUp", userController.signUp);
userRouter.post("/logIn", userController.logIn);
userRouter.get("/userProfile", verifyJWT, userController.getUserProfile);
userRouter.put(
	"/updateUserProfile",
	verifyJWT,
	userController.updateUserProfile,
);
userRouter.delete(
	"/deleteProfile",
	verifyJWT,
	userController.deleteUserProfile,
);
userRouter.get("/refreshAccessToken", userController.refreshAccessToken);

module.exports = userRouter;
