// /facades/BookingFacade.js
const { BookingModel } = require("../models/Booking");
const Bus = require("../models/Bus");
const User = require("../models/User");
const bookingEmitter = require("../observers/BookingEvent");

class BookingFacade {
  async create(userId, busId, seatNumber) {
    const bus = await Bus.findById(busId);
    if (!bus) throw new Error("Bus not found");

    const existing = await BookingModel.findOne({ bus: busId, seatNumber });
    if (existing) throw new Error("Seat already booked");

    const booking = await BookingModel.create({
      user: userId,
      bus: busId,
      seatNumber,
    });

    const user = await User.findById(userId);

    bookingEmitter.emit("busBooked", {
      email: user.email,
      bus: {
        busNumber: bus.busNumber,
        date: bus.date,
        departureTime: bus.departureTime,
        seatNumber,
      },
    });

    return booking;
  }
}

module.exports = new BookingFacade();
