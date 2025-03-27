const mongoose = require("mongoose");

const busSchema = new mongoose.Schema({
  busNumber: { type: String, required: true, unique: true },
  from: { type: String, required: true },
  to: { type: String, required: true },
  departureTime: { type: String, required: true },
  date: { type: Date, required: true },
  seatsAvailable: { type: Number, default: 40 },
});

module.exports = mongoose.model("Bus", busSchema);
