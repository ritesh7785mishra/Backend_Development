const userModel = require("../models/userModel");

module.exports.getUsers = async function getUsers(req, res) {
  let allUsers = await userModel.find();
  // let user = await userModel.findOne({ name: "Ritesh" });
  res.json({
    message: "list of allusers",
    data: allUsers,
  });
};

module.exports.postUser = function postUser(req, res) {
  console.log(req.body);
  users = req.body;
  res.json({
    message: "data received successfully",
    user: req.body,
  });
};

module.exports.updateUser = async function updateUser(req, res) {
  console.log("req body ->", req.body);
  //updated data in users object
  let dataToBeUpdated = req.body;
  let user = await userModel.findOneAndUpdate(
    { email: "abc@gmail.com" },
    dataToBeUpdated
  );
  // for (key in dataToBeUpdated) {
  //   users[key] = dataToBeUpdated[key];
  // }
  res.json({
    message: "data updated successfully",
  });
};
module.exports.deleteUser = async function deleteUser(req, res) {
  // users = {};
  let user = await userModel.findOneAndDelete({ email: "dcwk@gmail.com" });
  res.json({
    message: "data deleted successfully",
    data: user,
  });
};

module.exports.getUserById = function getUserById(req, res) {
  console.log(req.param.id);
  let paramId = req.params.id;
  let obj = {};
  for (let i = 0; i < users.length; i++) {
    if (users[i]["id"] == paramId) {
      obj = users[i];
    }
  }

  res.json({
    message: "req received",
    data: obj,
  });
};
//   function getCookies(req, res) {
//     let cookies = req.cookies;
//     console.log(cookies);
//     res.send("Cookies Received");
//   }
//   function setCookies(req, res) {
//     // res.setHeader("Set-Cookie", "isLoggedIn=true");
//     res.cookie("isLoggedIn", true, {
//       maxAge: 1000 * 60 * 60 * 24,
//       secure: true, // can be accessed only through secure sights.
//       httpOnly: true, //cookie will only accessible through backend can be accessed throug front end
//     });
//     res.send("Cookies has been set");
//   }
