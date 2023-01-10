const express = require("express");
const app = express();
// const userModel = require("../models/userModel");
const userRouter = express.Router();

require("dotenv").config();
const {
  signup,
  login,
  isAuthorised,
  protectRoute,
} = require("../controller/authController");

const {
  getUser,
  updateUser,
  deleteUser,
  getAllUser,
} = require("../controller/userController");

// user ke options
userRouter.route("/:id").patch(updateUser).delete(deleteUser);

userRouter.route("/signup").post(signup);
userRouter.route("/login").post(login);

//Profile Page
app.use(protectRoute);
userRouter.route("/userProfile").get(getUser);

//admin specific function
app.use(isAuthorised(["admin"]));

userRouter.route("").get(getAllUser);

module.exports = userRouter;
