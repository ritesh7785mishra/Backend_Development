const jwt = require("jsonwebtoken");
require("dotenv").config();

function protectRoute(req, res, next) {
  if (req.cookies.login) {
    let isVerified = jwt.verify(req.cookies.login, process.env.JWT_KEY);
    if (isVerified) {
      next();
    } else {
      return res.json({
        message: "logging failed , user not verified",
      });
    }
  } else {
    return res.json({
      message: " Operation not valid",
    });
  }
}

module.exports = protectRoute;
