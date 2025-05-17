const mongoose = require("mongoose");

// Define Mongoose schema
const bookingSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  bus: { type: mongoose.Schema.Types.ObjectId, ref: "Bus", required: true },
  seatNumber: { type: Number, required: true },
  bookingDate: { type: Date, default: Date.now },
});

// Create Mongoose model
const BookingModel = mongoose.model("Booking", bookingSchema);

// Prototype class for cloning
class BookingPrototype {
  constructor({ userId, busId, date, seats, pickup, drop }) {
    this.userId = userId;
    this.busId = busId;
    this.date = date;
    this.seats = seats;
    this.pickup = pickup;
    this.drop = drop;
  }

  clone() {
    return new BookingPrototype({
      userId: this.userId,
      busId: this.busId,
      date: this.date,
      seats: this.seats,
      pickup: this.pickup,
      drop: this.drop,
    });
  }
}

// Export both
module.exports = {
  BookingModel,
  BookingPrototype,
};
