const Bus = require("../models/Bus");
const { BusSorter, SortByFare, SortByTime } = require("../BusSorter"); 

// GET /api/buses
const getAllBuses = async (req, res) => {
  const { from, to, date, sort } = req.query;
  let query = {};

  if (from) query.from = { $regex: from, $options: "i" };
  if (to) query.to = { $regex: to, $options: "i" };
  if (date) {
    try {
      query.date = new Date(date);
    } catch (err) {
      return res.status(400).json({ message: "Invalid date format" });
    }
  }
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
    res.status(500).json({ message: "Server Error", error: error.message  });
  }
};

  
// POST /api/buses
const addBus = async (req, res) => {
  const { busNumber, from, to, departureTime, date, seatsAvailable, fare } = req.body;

  if (!busNumber || !from || !to || !departureTime || !date || !seatsAvailable || !fare) {
    return res.status(400).json({ message: "All fields are required" });
  }

  try {
    const bus = new Bus({ busNumber, from, to, departureTime, date, seatsAvailable, fare });
    await bus.save();
    res.status(201).json(bus);
  } catch (error) {
    res.status(500).json({ message: "Failed to add bus", error: error.message });
  }
};

// GET /api/buses/:id
const getBusById = async (req, res) => {
  try {
    const bus = await Bus.findById(req.params.id);
    if (!bus) {
      return res.status(404).json({ message: "Bus not found" });
    }
    res.status(200).json(bus);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch bus", error: error.message });
  }
};

// PUT /api/buses/:id
const updateBus = async (req, res) => {
  try {
    const updated = await Bus.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updated) {
      return res.status(404).json({ message: "Bus not found" });
    }
    res.status(200).json(updated);
  } catch (error) {
    res.status(500).json({ message: "Failed to update bus", error: error.message });
  }
};

// DELETE /api/buses/:id
const deleteBus = async (req, res) => {
															 
																		  
									   
  
										  

									
										   
  try {
    const deleted = await Bus.findByIdAndDelete(req.params.id);
    if (!deleted) {
      return res.status(404).json({ message: "Bus not found" });
    }
    res.json({ message: "Bus deleted successfully" });
  } catch (error) {
														 
    res.status(500).json({ message: "Failed to delete bus", error: error.message });
  }
};

//const logger = require('../utils/Logger');

// // Example usage inside a controller
// exports.getAllBuses = async (req, res) => {
//   try {
//     logger.log("Fetching all buses");
//     // Fetch bus logic here
//     res.status(200).json({ message: "Buses fetched successfully" });
//   } catch (error) {
//     logger.log(`Error fetching buses: ${error.message}`);
//     res.status(500).json({ error: "Internal Server Error" });
//   }
// };


module.exports = { getAllBuses, addBus, updateBus, deleteBus, getBusById  };
