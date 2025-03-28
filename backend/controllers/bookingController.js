const Booking = require("../models/Booking");

// POST /api/bookings - Book a bus ticket
const createBooking = async (req, res) => {
  const { busId, seatNumber } = req.body;

  const existing = await Booking.findOne({ bus: busId, seatNumber });
  if (existing) return res.status(400).json({ message: "Seat already booked" });

  const booking = await Booking.create({
    user: req.user._id,
    bus: busId,
    seatNumber,
  });

  res.status(201).json(booking);
};

// GET /api/bookings/user - User's booking history
const getUserBookings = async (req, res) => {
  const bookings = await Booking.find({ user: req.user._id }).populate("bus");
  res.json(bookings);
};

// DELETE /api/bookings/:id - Cancel booking
const cancelBooking = async (req, res) => {
  const booking = await Booking.findById(req.params.id);

  if (!booking) return res.status(404).json({ message: "Booking not found" });
  if (booking.user.toString() !== req.user._id.toString())
    return res.status(403).json({ message: "Not authorized" });

  await booking.deleteOne();
  res.json({ message: "Booking cancelled" });
};

module.exports = { createBooking, getUserBookings, cancelBooking };
