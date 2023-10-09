const express = require("express");

const authService = require("../shared/auth.service");

const userRoute = express.Router();

const userController = require("../controllers/userController");

userRoute.post("/register", userController.register);
userRoute.post("/login", userController.login);
userRoute.put("/updateUser/:id", authService.validateToken, userController.updateUser);
userRoute.delete("/deleteUser/:id", authService.validateToken, userController.deleteUser);
userRoute.get("/getUsers", authService.validateToken, userController.getAllUsers);


module.exports = userRoute;