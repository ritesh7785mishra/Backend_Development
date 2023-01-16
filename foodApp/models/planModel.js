const mongoose = require("mongoose");
mongoose.set("strictQuery", true);
// const emailValidator = require("email-validator");
const bcrypt = require("bcrypt");
// const crypto = require("crypto");
// require("dotenv").config();

const db_link =
  "mongodb+srv://admin:XdE8RNtOJ43zIWy1@cluster0.q1orxes.mongodb.net/?retryWrites=true&w=majority";

mongoose
  .connect(db_link)
  .then(function (db) {
    console.log("plan db connected");
  })
  .catch((err) => {
    console.log(err.message);
  });

const planSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true,
    maxLength: [20, "Plan name should not exceed more than 20 characters"], // value for maxlength then a custom error message.
  },
  duration: {
    type: Number,
    required: true,
  },
  price: {
    type: Number,
    required: [true, "price not entered"],
  },
  ratingsAverage: {
    type: Number,
  },
  discount: {
    type: Number,
    validate: [
      function () {
        return this.discount < 100;
      },
      "discount should not exceed price",
    ],
  },
});

//model
const planModel = mongoose.model("planModel", planSchema);

// (async function createPlan() {
//   let planObj = {
//     name: "super food 10",
//     duration: 30,
//     price: 1000,
//     ratingsAverage: 5,
//     discount: 20,
//   };
//   //   let data = await planModel.create(planObj);
//   //   console.log(data);
//   const doc = new planModel(planObj);
//   await doc.save();
//   console.log(doc);
// })();

module.exports = planModel;
