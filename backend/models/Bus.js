const mongoose = require("mongoose");

const busSchema = new mongoose.Schema({
  // name: { type: String, required: true },
  // route: { type: String, required: true },
  busNumber: { type: String, required: true },
  from: { type: String, required: true },
  to: { type: String, required: true },
  departureTime: { type: String, required: true },
  date: { type: String, required: true },
  seatsAvailable: { type: Number, required: true },
  fare: { type: Number, required: true }, // 👈 Add this line
});

const Bus = mongoose.models.Bus || mongoose.model("Bus", busSchema);

module.exports = Bus;