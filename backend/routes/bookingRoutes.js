const express = require("express");
const {
  createBooking,
  getUserBookings,
  cancelBooking,
} = require("../controllers/bookingController");
const { protect } = require("../middleware/authMiddleware");

const router = express.Router();

router.post("/", protect, createBooking);
router.get("/user", protect, getUserBookings);
router.delete("/:id", protect, cancelBooking);
// router.get("/", protect, admin, getAllBookings);


module.exports = router;
