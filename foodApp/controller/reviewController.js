const reviewModel = require("../models/reviewModel");
const planModel = require("../models/planModel");
const { updatePlan } = require("../controller/planController");

// get all reviews
module.exports.getAllReviews = async function getAllReviews(req, res) {
  try {
    const reviews = await reviewModel.find();
    if (reviews) {
      return res.json({
        message: "reviews retrieved",
        data: reviews,
      });
    } else {
      return res.json({
        message: "reviews not found",
      });
    }
  } catch (error) {
    return res.json({
      message: error.message,
    });
  }
};

// top 3 reviews
module.exports.top3reviews = async function top3reviews(req, res) {
  try {
    const reviews = await reviewModel
      .find()
      .sort({
        rating: -1,
      })
      .limit(3);
    if (reviews) {
      return res.json({
        message: "reviews retrieved",
        data: reviews,
      });
    } else {
      return res.json({
        message: "reviews not found",
      });
    }
  } catch (error) {
    return res.json({
      message: error.message,
    });
  }
};

//get plan review

module.exports.getPlanReviews = async function getPlanReviews(req, res) {
  try {
    let planid = req.params.id;
    let reviews = await reviewModel.find();
    reviews.filter((review) => review.plan._id == planid);

    return res.json({
      message: "reviews retrieved for a plan successfully",
      data: reviews,
    });
  } catch (error) {
    return res.json({
      message: error.message,
    });
  }
};

//create Review

module.exports.createReview = async function createReview(req, res) {
  try {
    let id = req.params.plan;
    let plan = await planModel.findById(id);
    if (plan) {
      let review = await reviewModel.create(req.body);
      plan.ratingsAverage = (req.body.rating + plan.ratingsAverage) / 2;
      await plan.save();
      return res.json({
        message: "Review created Successfully",
        data: review,
      });
    } else {
      return res.json({
        message: "Plan not found",
      });
    }
  } catch (error) {
    res.json({
      message: error.message,
    });
  }
};

//update review

module.exports.updateReview = async function updateReview(req, res) {
  try {
    let planid = req.params.id;

    //review id from frontend
    let id = req.body.id;
    let review = await reviewModel.findById(id);
    let dataToBeUpdated = req.body;

    if (review) {
      let keys = [];
      for (let key in dataToBeUpdated) {
        if (key == "id") continue;
        keys.push(key);
      }

      for (let i = 0; i < keys.length; i++) {
        review[keys[i]] = dataToBeUpdated[keys[i]];
      }

      const updatedReview = await review.save();
      return res.json({
        message: "review updated Successfully",
        data: updatedReview,
      });
    } else {
      res.json({
        message: "review not found",
      });
    }
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

//delete review

module.exports.deleteReview = async function deleteReview(req, res) {
  try {
    let planid = req.params.id;

    // id from the frontend.
    let id = req.body.id;
    let review = await reviewModel.findByIdAndDelete(id);

    if (review) {
      return res.json({
        message: "review deleted Successfully",
        data: review,
      });
    } else {
      res.json({
        message: "review not found",
      });
    }
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};
