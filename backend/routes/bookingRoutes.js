const express = require("express");
const {
  createBooking,
  getUserBookings,
  cancelBooking,
  cloneBooking, 
} = require("../controllers/bookingController");
const { protect } = require("../middleware/authMiddleware");

const router = express.Router();

// Existing routes
router.post("/", protect, createBooking);
router.get("/user", protect, getUserBookings);
router.delete("/:id", protect, cancelBooking);

router.post("/:id/clone", protect, cloneBooking); 

module.exports = router;
