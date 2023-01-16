const express = require("express");
const reviewRouter = express.Router();
const { protectRoute, isAuthorised } = require("../controller/authController");

//get all reviews

reviewRouter.route("/all").get(getAllReviews);

//top 3 reviews

reviewRouter.route("/top3").get(top3reviews);

//get review
reviewRouter.route("/:id").get(getPlanReviews);

module.exports = reviewRouter;

reviewRouter.use(protectRoute);
reviewRouter.route("").post(createReview);

reviewRouter.route("/crud/:id").patch(updateReview).delete(deleteReview);

module.exports = reviewRouter;
