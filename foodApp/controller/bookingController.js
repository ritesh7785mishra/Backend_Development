// This is a public sample test API key.
// Don’t submit any personally identifiable information in requests made with this key.
// Sign in to see your own test API key embedded in code samples.
const { SSK } = process.env;
const stripe = require("stripe")(SSK);
const express = require("express");
const app = express();
app.use(express.static("public"));
const planModel = require("../models/planModel");
const userModel = require("../models/userModel");

module.exports.createSession = async function createSession(req, res) {
  try {
    let userId = req.id;
    let planId = req.params.id;
    const user = await userModel.findById(userId);
    const plan = await planModel.findById(planId);

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      customer_email: user.email,
      client_reference_id: plan.id,
      line_items: [
        {
          name: plan.name,
          description: plan.description,
          amout: plan.price * 100,
          currency: "inr",
          quantity: 1,
        },
      ],
      success_url: `${req.protocol}://${req.get("host")}/profile`,
      cancel_url: `${req.protocol}://${req.get("host")}/profile`,
    });

    res.status(200).json({
      status: "success",
      session,
    });
  } catch (error) {
    res.status(500).json({
      err: err.message,
    });
  }
};
