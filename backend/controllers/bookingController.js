const bookingEmitter = require("../observers/BookingEvent");
require("../observers/mailObserver");

const Booking = require("../models/Booking");
const Bus = require("../models/Bus");
const User = require("../models/User"); // ✅ Used to fetch user email

// POST /api/bookings - Book a bus ticket
const createBooking = async (req, res) => {
  const { busId, seatNumber } = req.body;

  // Check if seat is already booked
  const existing = await Booking.findOne({ bus: busId, seatNumber });
  if (existing) return res.status(400).json({ message: "Seat already booked" });

  // Create booking
  const booking = await Booking.create({
    user: req.user._id,
    bus: busId,
    seatNumber,
  });

  // Fetch bus and user details for confirmation email
  const bus = await Bus.findById(busId);
  const user = await User.findById(req.user._id);

  // Emit booking confirmation event (Observer Pattern)
  bookingEmitter.emit("busBooked", {
    email: user.email,
    bus: {
      busNumber: bus.name, // or bus.busNumber if you renamed it
      date: bus.date,
      departureTime: bus.departureTime,
      seatNumber: seatNumber,
    },
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

// GET /api/bookings - for admin
const getAllBookings = async (req, res) => {
  try {
    const bookings = await Booking.find()
      .populate("user", "email")
      .populate("bus", "busNumber from to");
    res.json(bookings);
  } catch (error) {
    console.error("Error fetching bookings:", error.message);
    res.status(500).json({ message: "Failed to fetch bookings" });
  }
};

module.exports = {
  createBooking,
  getUserBookings,
  getAllBookings,
  cancelBooking,
};
const cloneBooking = async (req, res) => {
  try {
    const original = await Booking.findById(req.params.id);
    if (!original) return res.status(404).json({ message: "Original booking not found" });

    const { seatNumber } = req.body;
    if (!seatNumber) return res.status(400).json({ message: "Seat number is required" });

    const seatTaken = await Booking.findOne({
      bus: original.bus,
      bookingDate: original.bookingDate,
      seatNumber,
    });

    if (seatTaken) {
      return res.status(409).json({ message: "Seat already taken" });
    }

    const newBooking = await Booking.create({
      user: req.user._id,
      bus: original.bus,
      seatNumber,
      bookingDate: new Date(), // or original.bookingDate
    });

    res.status(201).json({ message: "Booking cloned successfully", newBooking });
  } catch (err) {
    console.error("Clone error:", err.message);
    res.status(500).json({ message: "Failed to clone booking" });
  }
};
module.exports = {
  createBooking,
  getUserBookings,
  cancelBooking,
  getAllBookings,
  cloneBooking, 
};

