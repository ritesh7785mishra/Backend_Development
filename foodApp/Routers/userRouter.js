const express = require("express");
const app = express();
const userModel = require("../models/userModel");
const protectRoute = require("./authHelper");

const {
  getUsers,
  postUser,
  updateUser,
  deleteUser,
  getUserById,
} = require("../controller/userController");
let users = [
  {
    id: 1,
    name: "Ritesh",
  },
  {
    id: 2,
    name: "Shubham",
  },
  {
    id: 3,
    name: "Vishal",
  },
];

const userRouter = express.Router();
// app.use("/users", userRouter);

userRouter
  .route("/")
  .get(protectRoute, getUsers)
  .post(postUser)
  .patch(updateUser)
  .delete(deleteUser);

// userRouter.route("/getCookies").get(getCookies);

// userRouter.route("/setCookies").get(setCookies);

userRouter.route("/:id").get(getUserById);

module.exports = userRouter;
