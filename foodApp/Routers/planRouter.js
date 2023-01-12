const express = require("express");
const planRouter = express.Router();
const { protectRoute, isAuthorised } = require("../controller/authController");

//all plants
planRouter.route("/allPlans").get(getAllPlans);

//own plan -> logged in necessary
planRouter.use(protectRoute);
planRouter.route("/plan/:id").get(getPlan);

// admin and restaurant owneers can only create, update or delete plans
planRouter.use(isAuthorised[("admin", "restaurantowner")]);
planRouter
  .route("/crudPlan")
  .post(createPlan)
  .patch(updatePlan)
  .delete(deletePlan);
