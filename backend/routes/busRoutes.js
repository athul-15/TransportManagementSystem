const express = require("express");
const {
  getAllBuses,
  addBus,
  updateBus,
  deleteBus,
} = require("../controllers/busController");

const { protect } = require("../middleware/authMiddleware");

const router = express.Router();

router.get("/", getAllBuses); // public
router.post("/", protect, addBus); // admin only (basic protect for now)
router.put("/:id", protect, updateBus); // admin only
router.delete("/:id", protect, deleteBus); // admin only

module.exports = router;
