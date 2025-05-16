const Bus = require("../models/Bus");
const { BusSorter, SortByFare, SortByTime } = require("../BusSorter"); 

// GET /api/buses
const getAllBuses = async (req, res) => {
  const { from, to, date, sort } = req.query;
  let query = {};

  if (from) query.from = { $regex: from, $options: "i" };
  if (to) query.to = { $regex: to, $options: "i" };
  if (date) query.date = new Date(date);

  try {
    const buses = await Bus.find(query);

    // Apply sorting based on query param
    const sorter = new BusSorter(null);

    if (sort === "fare") {
      sorter.setStrategy(new SortByFare());
    } else if (sort === "time") {
      sorter.setStrategy(new SortByTime());
    }

    const result = sort ? sorter.sort([...buses]) : buses;

    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({ message: "Server Error", error });
  }
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
const logger = require('../utils/Logger');

// Example usage inside a controller
exports.getAllBuses = async (req, res) => {
  try {
    logger.log("Fetching all buses");
    // Fetch bus logic here
    res.status(200).json({ message: "Buses fetched successfully" });
  } catch (error) {
    logger.log(`Error fetching buses: ${error.message}`);
    res.status(500).json({ error: "Internal Server Error" });
  }
};


module.exports = { getAllBuses, addBus, updateBus, deleteBus };
