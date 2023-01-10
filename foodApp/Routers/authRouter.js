const express = require("express");
const app = express();
const userModel = require("../models/userModel");
const protectRoute = require("./authHelper");
const jwt = require("jsonwebtoken");
require("dotenv").config();

const authRouter = express.Router();

authRouter.route("/signup").get(middleware, getSignUp).post(postSignUp);

authRouter.route("/login").post(loginUser);

function middleware(req, res, next) {
  console.log("middleware encountered");
  next();
}

async function getSignUp(req, res) {
  let dataObj = req.body;
  let user = await userModel.create({ dataObj });
  // res.sendFile("/public/index.html", { root: __dirname });
}

async function postSignUp(req, res) {
  let dataObj = req.body;
  let user = await userModel.create(dataObj);

  console.log("backend", dataObj);

  res.json({
    message: "user signed up hi",
    data: user,
  });
}

async function loginUser(req, res) {
  try {
    let data = req.body;
    if (data.email) {
      let user = await userModel.findOne({ email: data.email });
      if (user) {
        //bcrypt -> compare
        if (user.password == data.password) {
          let uid = user["_id"];
          let token = jwt.sign({ payload: uid }, process.env.JWT_KEY);
          res.cookie("login", token, { httpOnly: true });

          return res.json({
            message: "User has logged in",
            userDetails: data,
          });
        } else {
          return res.json({
            message: "Incorrect Password",
          });
        }
      } else {
        return res.json({
          message: "user not found",
        });
      }
    } else {
      return res.json({
        message: "Empty Field Found",
      });
    }
  } catch (error) {
    return res.status(500).json({
      message: error.message,
    });
  }
}

module.exports = authRouter;
