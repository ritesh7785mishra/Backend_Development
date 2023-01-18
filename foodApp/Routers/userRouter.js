const express = require("express");
const app = express();
// const userModel = require("../models/userModel");
const userRouter = express.Router();
const multer = require("multer");

require("dotenv").config();
const {
  signup,
  login,
  isAuthorised,
  protectRoute,
  forgetpassword,
  resetpassword,
  logout,
} = require("../controller/authController");

const {
  getUser,
  updateUser,
  deleteUser,
  getAllUser,
  updateProfileImage,
} = require("../controller/userController");

// user ke options
userRouter.route("/:id").patch(updateUser).delete(deleteUser);

userRouter.route("/signup").post(signup);
userRouter.route("/login").post(login);

userRouter.route("/forgetpassword").post(forgetpassword);
userRouter.route("/resetpassword/:token").post(resetpassword);
userRouter.route("/logout").get(logout);

//multer for fileupload
// upload -> Storage, filter
const multerStorage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(
      null,
      "/Users/Ritesh/Documents/backend project/backendLearning-Projects/foodApp/public/images"
    );
  },
  filename: function (req, file, cb) {
    cb(null, `user-${Date.now()}.jpeg`);
  },
});

const filter = function (req, file, cb) {
  if (file.mimetype == "image/png") {
    cb(null, true);
  } else {
    cb(new Error("Not an Image! Please upload an image"));
  }
};
//change the position after manual testing place it after protect route
const uplaod = multer({
  storage: multerStorage,
  fileFilter: filter,
});

userRouter.post("/ProfileImage", uplaod.single("photo"), updateProfileImage);

userRouter.get("/ProfileImage", (req, res) => {
  res.sendFile(
    "/Users/Ritesh/Documents/backend project/backendLearning-Projects/foodApp/multer.html"
  );
});

//Profile Page
userRouter.use(protectRoute);
userRouter.route("/userProfile").get(getUser);

//admin specific function
userRouter.use(isAuthorised(["admin"]));

userRouter.route("/").get(getAllUser);

module.exports = userRouter;
