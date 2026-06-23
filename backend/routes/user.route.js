const express = require("express");
const userController = require("../controllers/user.controller.js");
const userRouter = express.Router();

userRouter.get("/allUsers", userController.getAllUsers);
userRouter.post("/signUp", userController.signUp);
userRouter.post("/logIn", userController.logIn);
userRouter.get("/userProfile", userController.getUserProfile);
userRouter.put("/updateUserProfile", userController.updateUserProfile);
userRouter.delete("/deleteProfile", userController.deleteUserProfile);

module.exports = userRouter;
