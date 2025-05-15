const mongoose = require("mongoose");

const busSchema = new mongoose.Schema({
  name: { type: String, required: true },
  route: { type: String, required: true },
  departureTime: { type: String, required: true },
  date: { type: String, required: true },
  seatsAvailable: { type: Number, required: true },
  fare: { type: Number, required: true }, // 👈 Add this line
});

module.exports = mongoose.model("Bus", busSchema);
