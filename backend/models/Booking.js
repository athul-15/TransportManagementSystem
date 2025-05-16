const mongoose = require("mongoose");

const bookingSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  bus: { type: mongoose.Schema.Types.ObjectId, ref: "Bus", required: true },
  seatNumber: { type: Number, required: true },
  bookingDate: { type: Date, default: Date.now },
});

// Prototype design pattern applied using clone method

class Booking {
  constructor({ userId, busId, date, seats, pickup, drop }) {
    this.userId = userId;
    this.busId = busId;
    this.date = date;
    this.seats = seats;
    this.pickup = pickup;
    this.drop = drop;
  }

  // Prototype pattern: Clone the booking
  clone() {
    return new Booking({ 
      userId: this.userId,
      busId: this.busId,
      date: this.date,          
      seats: this.seats,
      pickup: this.pickup,
      drop: this.drop
    });
  }
}

module.exports = Booking;

module.exports = mongoose.model("Booking", bookingSchema);
