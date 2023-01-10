const userModel = require("../models/userModel");

module.exports.getUser = async function getUser(req, res) {
  let id = req.params.id;
  let user = await userModel.findById(id);
  // let user = await userModel.findOne({ name: "Ritesh" });
  // res.json({
  //   message: "list of allusers",
  //   data: allUsers,
  // });

  if (user) {
    res.json(user);
  } else {
    res.json({
      message: "user not found",
    });
  }
};

module.exports.updateUser = async function updateUser(req, res) {
  try {
    console.log("req body ->", req.body);
    //updated data in users object
    let id = req.params.id;
    let user = await userModel.findById(id);
    let dataToBeUpdated = req.body;
    if (user) {
      const keys = [];
      for (let key in dataToBeUpdated) {
        keys.push(key);
      }

      for (let index = 0; index < keys.length; index++) {
        user[keys[i]] = dataToBeUpdated[keys[i]];
      }
      const updatedData = await user.save(); //
      res.json({
        message: "data updated successfully",
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

module.exports.deleteUser = async function deleteUser(req, res) {
  try {
    let id = req.params.id;
    let user = await userModel.findByIdAndDelete(id);
    if (user) {
      return res.json({
        message: "data deleted successfully",
        data: user,
      });
    } else {
      return res.json({
        message: "user not found",
      });
    }
  } catch (error) {
    return res.json({
      message: error.message,
    });
  }
};

module.exports.getAllUser = async function getUserById(req, res) {
  try {
    let users = await userModel.find();
    if (users) {
      res.json({
        message: "users retrieved",
        data: users,
      });
    } else {
      res.json({
        message: "Users not available",
      });
    }
  } catch (error) {
    res.json({
      message: error.message,
    });
  }
};
