const mongoose = require("mongoose");
mongoose.set("strictQuery", false);
const emailValidator = require("email-validator");
const bcrypt = require("bcrypt");

const db_link =
  "mongodb+srv://admin:XdE8RNtOJ43zIWy1@cluster0.q1orxes.mongodb.net/?retryWrites=true&w=majority";

mongoose
  .connect(db_link)
  .then(function (db) {
    // console.log(db);
    console.log("data base connected");
  })
  .catch((err) => {
    console.log("error");
  });

const userSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    validate: function () {
      return emailValidator.validate(this.email);
    },
  },
  password: {
    type: String,
    required: true,
    minLength: 8,
  },
  confirmPassword: {
    type: String,
    required: true,
    minLength: 8,
    validate: function () {
      return this.confirmPassword == this.password;
    },
  },
  role: {
    type: String,
    enum: ["admin", "user", "restaurantowner", "deliveryboy"],
    default: "user",
  },
  profileImage: {
    type: String,
    default: "img/users/default.jpeg",
  },
});

userSchema.pre("save", function () {
  this.confirmPassword = undefined;
});

// userSchema.pre("save", async function () {
//   let salt = await bcrypt.genSalt();
//   let hashedString = await bcrypt.hash(this.password, salt);
//   this.password = hashedString;
// });

userSchema.post("save", (doc) => {
  console.log("Post save called", doc);
});

//model

const userModel = mongoose.model("userModel", userSchema);

module.exports = userModel;

// (async function createUser() {
//   let user = {
//     name: "Ritesh",
//     email: "dcw@gmail.com",
//     password: "12345678",
//     confirmPassword: "12345678",
//   };

//   let data = await userModel.create(user);
//   console.log(data);
// })();
