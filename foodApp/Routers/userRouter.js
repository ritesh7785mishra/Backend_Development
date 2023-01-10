const express = require("express");
const app = express();
const userModel = require("../models/userModel");
const protectRoute = require("./authHelper");

const {
  getUser,
  updateUser,
  deleteUser,
  getAllUser,
} = require("../controller/userController");

// user ke options
userRouter.route("/:id").patch(updateUser).delete(deleteUser);

//Profile Page
app.use(protectRoute);
userRouter.route("/userProfile").get(getUser);

//admin specific function
app.use(isAuthorise(["admin"]));

userRouter.route("").get(getAllUser);

module.exports = userRouter;
