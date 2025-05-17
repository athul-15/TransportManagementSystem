const bookingEmitter = require("../observers/BookingEvent");
require("../observers/mailObserver");
const { BookingModel } = require("../models/Booking");

//const Booking = require("../models/Booking");
const Bus = require("../models/Bus");
const User = require("../models/User");

// POST /api/bookings - Book a bus ticket
const createBooking = async (req, res) => {
  try {
    const { busId, seatNumber } = req.body;

    // Check if bus exists
    const bus = await Bus.findById(busId);
    if (!bus) return res.status(400).json({ message: "Bus not found" });

    // Check if seat is already booked
    const existing = await BookingModel.findOne({ bus: busId, seatNumber });
    if (existing) return res.status(400).json({ message: "Seat already booked" });

    // Create booking
    const booking = await BookingModel.create({
      user: req.user._id,
      bus: busId,
      seatNumber,
    });

    const user = await User.findById(req.user._id);

    // Emit booking confirmation event (Observer Pattern)
    bookingEmitter.emit("busBooked", {
      email: user.email,
      bus: {
        busNumber: bus.busNumber,
        date: bus.date,
        departureTime: bus.departureTime,
        seatNumber: seatNumber,
      },
    });

    res.status(201).json(booking);
  } catch (error) {
console.error("Create booking error:", error);
    res.status(500).json({ message: "Failed to create booking" });
  }
};

// GET /api/bookings/user - User's booking history
const getUserBookings = async (req, res) => {
  try {
    const bookings = await BookingModel.find({ user: req.user._id }).populate(
      "bus",
      "busNumber from to departureTime date seatsAvailable fare"
    );
    res.json(bookings);
  } catch (error) {
    console.error("Get user bookings error:", error.message);
    res.status(500).json({ message: "Failed to fetch bookings" });
  }
};

// DELETE /api/bookings/:id - Cancel booking
const cancelBooking = async (req, res) => {
  try {
    const booking = await BookingModel.findById(req.params.id);
    if (!booking) return res.status(404).json({ message: "Booking not found" });
    if (booking.user.toString() !== req.user._id.toString())
      return res.status(403).json({ message: "Not authorized" });

    await booking.deleteOne();
    res.json({ message: "Booking cancelled" });
  } catch (error) {
    console.error("Cancel booking error:", error.message);
    res.status(500).json({ message: "Failed to cancel booking" });
  }
};

// GET /api/bookings - for admin
const getAllBookings = async (req, res) => {
  try {
    const bookings = await BookingModel.find()
      .populate("user", "email")
      .populate("bus", "busNumber from to");
    res.json(bookings);
  } catch (error) {
    console.error("Error fetching bookings:", error.message);
    res.status(500).json({ message: "Failed to fetch bookings" });
  }
};

// POST /api/bookings/clone/:id - Clone a booking
const cloneBooking = async (req, res) => {
  try {
    const original = await BookingModel.findById(req.params.id);
    if (!original) return res.status(404).json({ message: "Original booking not found" });

    // Validate original booking bus
    if (!original.bus) {
      return res.status(400).json({ message: "Original booking has no bus reference" });
    }

    const { seatNumber } = req.body;
    if (!seatNumber) return res.status(400).json({ message: "Seat number is required" });

    // Check if seat is already taken on the same bus and date
    const seatTaken = await BookingModel.findOne({
      bus: original.bus,
      bookingDate: original.bookingDate,
      seatNumber,
    });

    if (seatTaken) {
      return res.status(409).json({ message: "Seat already taken" });
    }

    const newBooking = await BookingModel.create({
      user: req.user._id,
      bus: original.bus,
      seatNumber,
      bookingDate: new Date(), // or original.bookingDate
    });

    await newBooking.populate("bus", "busNumber from to departureTime date seatsAvailable fare");

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
