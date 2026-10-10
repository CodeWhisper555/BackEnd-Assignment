const express = require("express");
const router = express.Router();
const planController = require("../controllers/planController");
const {protect} = require("../middleware/auth");

router.get("", planController.getPlans);

router.get("/mine",protect,planController.getMyPlans);

router.get("/:id", planController.getPlanById);

router.get("/pending", planController.getPendingPlans);

router.post("/", protect,planController.createPlan);

router.put("/:id", protect ,planController.updatePlan);

router.delete("/:id", protect, planController.deletePlan);

module.exports = router;
