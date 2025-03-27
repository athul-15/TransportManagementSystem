const Bus = require("../models/Bus");

// GET /api/buses
const getAllBuses = async (req, res) => {
  const buses = await Bus.find();
  res.json(buses);
};

// POST /api/buses
const addBus = async (req, res) => {
  const { busNumber, from, to, departureTime, date, seatsAvailable } = req.body;
  const bus = new Bus({ busNumber, from, to, departureTime, date, seatsAvailable });
  await bus.save();
  res.status(201).json(bus);
};

// PUT /api/buses/:id
const updateBus = async (req, res) => {
  const updated = await Bus.findByIdAndUpdate(req.params.id, req.body, { new: true });
  if (!updated) return res.status(404).json({ message: "Bus not found" });
  res.json(updated);
};

// DELETE /api/buses/:id
const deleteBus = async (req, res) => {
  const deleted = await Bus.findByIdAndDelete(req.params.id);
  if (!deleted) return res.status(404).json({ message: "Bus not found" });
  res.json({ message: "Bus deleted" });
};

module.exports = { getAllBuses, addBus, updateBus, deleteBus };
