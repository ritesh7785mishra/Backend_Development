const userModel = require("../models/userModel");

const jwt = require("jsonwebtoken");
require("dotenv").config();

//sign up user
module.exports.signup = async function signup(req, res) {
  try {
    let dataObj = req.body;
    let user = await userModel.create(dataObj);
    if (user) {
      res.json({
        message: "user signed up",
        data: user,
      });
    } else {
      res.json({
        message: "user not found",
      });
    }
  } catch (error) {
    res.json({
      message: error.message,
    });
  }
};

//// login user
module.exports.login = async function login(req, res) {
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
            message: "Wrong credentials",
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
};

//isAuthorised -> to check the users role [admin , user , restaurant , deliveryboyd]

module.exports.isAuthorised = function isAuthorised(roles) {
  return function (req, res, next) {
    if (roles.includes(req.role) == true) {
      next();
    } else {
      res.status(401).json({
        message: "Operation not allowed",
      });
    }
  };
};

//protectRoute

module.exports.protectRoute = async function protectRoute(req, res, next) {
  try {
    let token;
    if (req.cookies.login) {
      token = req.cookies.login;
      let payload = jwt.verify(token, process.env.JWT_KEY);
      if (payload) {
        const user = await userModel.findById(payload.payload);
        req.role = user.role;
        req.id = user.id;
        next();
      }
    } else {
      return res.json({
        message: "please login",
      });
    }
  } catch (error) {
    return res.json({
      message: error.message,
    });
  }
};

//forgetPassword
module.exports.forgetpassword = async function forgetpassword(req, res) {
  let { email } = req.body;
  try {
    const user = await userModel.findOne({ email: email });
    if (user) {
      //createResetToken() used to create new token
      const resetToken = user.createResetToken();
      let resetPasswordLink = `${req.protocol}://${req.get(
        "host"
      )}/resetpassword/${resetToken}`;

      //send email to the user
      //nodemailer
    } else {
      return res.json({
        message: "Please signup first ",
      });
    }
  } catch (err) {
    res.status(500).json({
      message: err.message,
    });
  }
};

//resetPasswod
module.exports.resetpassword = async function resetpassword(req, res) {
  try {
    const token = req.params.token;
    let { password, confirmPassword } = req.body;
    const user = await userModel.findOne({ resetToken: token });
    if (user) {
      //reset password handler will change password and confirm password in db
      user.resetPasswordHandler(password, confirmPassword);
      await user.save();
      res.json({
        message: "user password changes successfully please login again ",
      });
    } else {
      res.json({
        message: "user not found",
      });
    }
  } catch (error) {
    res.json({
      message: err.message,
    });
  }
};
