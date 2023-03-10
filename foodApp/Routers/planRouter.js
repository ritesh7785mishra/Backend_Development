const express = require("express");
const planRouter = express.Router();

const { protectRoute, isAuthorised } = require("../controller/authController");
const {
  createPlan,
  getAllPlans,
  getPlan,
  updatePlan,
  deletePlan,
  top3Plans,
} = require("../controller/planController");

//all plants
planRouter.route("/allPlans").get(getAllPlans);

//own plan -> logged in necessary
planRouter.use(protectRoute);
planRouter.route("/plan/:id").get(getPlan);

// admin and restaurant owners can only create, update or delete plans
planRouter.use(isAuthorised(["admin", "restaurantowner"]));
planRouter.route("/crudPlan").post(createPlan);

planRouter.route("/crudPlan/:id").patch(updatePlan).delete(deletePlan);

planRouter.route("/top3Plans").get(top3Plans);

module.exports = planRouter;
