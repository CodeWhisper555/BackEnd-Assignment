const express = require("express");
const router = express.Router();
const Plan = require("../models/plan");
const planController = require("../controllers/planController");

router.get("", planController.getPlans);

router.get("/:id", planController.getPlanById);

router.get("/pending", planController.getPendingPlans);

router.post("/", planController.createPlan);

router.put("/:id", planController.updatePlan);

router.delete("/:id", planController.deletePlan);

module.exports = router;