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

userRouter.route("/forgetpassword").post(forgetpassword);
userRouter.route("/resetpassword/:token");
post(resetpassword);

//Profile Page
userRouter.use(protectRoute);
userRouter.route("/userProfile").get(getUser);

//admin specific function
userRouter.use(isAuthorised(["admin"]));

userRouter.route("/").get(getAllUser);

module.exports = userRouter;
