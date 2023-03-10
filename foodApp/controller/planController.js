const planModel = require("../models/planModel");

module.exports.getAllPlans = async function getAllPlans(req, res) {
  try {
    let plans = await planModel.find();
    if (plans) {
      return res.json({
        message: "all plans retrieved",
        data: plans,
      });
    } else {
      return res.json({
        message: "plans not found",
      });
    }
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

module.exports.getPlan = async function getPlan(req, res) {
  try {
    let id = req.params.id;
    let plan = await planModel.findById(id);
    if (plan) {
      return res.json({
        message: "plan retrieved",
        data: plan,
      });
    } else {
      return res.json({
        message: "plan not found",
      });
    }
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

module.exports.createPlan = async function createPlan(req, res) {
  try {
    let planData = req.body;
    let createdPlan = await planModel.create(planData);
    return res.json({
      message: "plan created Successfully",
      data: createdPlan,
    });
  } catch (error) {
    res.status(500).json({
      message: err.message,
    });
  }
};

module.exports.deletePlan = async function deletePlan(req, res) {
  try {
    let id = req.params.id;
    let deletedPlan = await planModel.findByIdAndDelete(id);
    return res.json({
      message: "plan deleted Successfully",
      data: deletedPlan,
    });
  } catch (error) {
    res.status(500).json({
      message: err.message,
    });
  }
};

module.exports.updatePlan = async function updatePlan(req, res) {
  try {
    let id = req.params.id;
    let plan = await planModel.findById(id);
    let dataToBeUpdated = req.body;

    if (plan) {
      let keys = [];
      for (let key in dataToBeUpdated) {
        keys.push(key);
      }

      // for (let key in keys) {
      //   plan[key] = dataToBeUpdated[key];
      // }

      for (let i = 0; i < keys.length; i++) {
        plan[keys[i]] = dataToBeUpdated[keys[i]];
      }

      const updatedPlan = await plan.save();
      return res.json({
        message: "plan updated Successfully",
        data: updatedPlan,
      });
    } else {
      res.json({
        message: "Plan not found",
      });
    }
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

//get top 3 plans

module.exports.top3Plans = async function top3Plans(req, res) {
  try {
    const plans3 = await planModel
      .find()
      .sort({
        ratingsAverage: -1,
      })
      .limit(3);

    if (plans3) {
      return res.json({
        message: "here are the top 3 plans ",
        data: plans3,
      });
    } else {
      return res.json({
        message: "plans not found",
      });
    }
  } catch (error) {
    res.status(500).json({
      message: err.message,
    });
  }
};
