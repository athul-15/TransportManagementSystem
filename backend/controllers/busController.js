const Bus = require("../models/Bus");

// GET /api/buses
const getAllBuses = async (req, res) => {
    const { from, to, date } = req.query;
    let query = {};
  
    if (from) query.from = { $regex: from, $options: "i" };
    if (to) query.to = { $regex: to, $options: "i" };
    if (date) query.date = new Date(date);
  
    const buses = await Bus.find(query);
    res.json(buses);
  };
  
  const fetchBuses = async () => {
    const params = new URLSearchParams();
    if (filters.from) params.append("from", filters.from);
    if (filters.to) params.append("to", filters.to);
    if (filters.date) params.append("date", filters.date);
  
    const res = await axios.get(`/buses?${params.toString()}`);
    setBuses(res.data);
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
