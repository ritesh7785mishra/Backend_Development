const userModel = require("../models/userModel");
const { login } = require("./authController");

module.exports.getUser = async function getUser(req, res) {
  let id = req.id;
  let user = await userModel.findById(id);

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
    //updated data in users object
    let id = req.params.id;
    let user = await userModel.findById(id);
    let dataToBeUpdated = req.body;
    if (user) {
      const keys = [];
      for (let key in dataToBeUpdated) {
        keys.push(key);
      }

      for (let i = 0; i < keys.length; i++) {
        user[keys[i]] = dataToBeUpdated[keys[i]];
      }
      const updatedData = await user.save(); //
      res.json({
        message: "data updated successfully",
        updatedData: updatedData,
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

module.exports.getAllUser = async function getAllUser(req, res) {
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
