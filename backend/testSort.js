const { BusSorter, SortByFare, SortByTime } = require("./BusSorter");

// Sample data
const buses = [
  { busId: 1, fare: 50, departureTime: "08:00" },
  { busId: 2, fare: 30, departureTime: "10:00" },
  { busId: 3, fare: 40, departureTime: "09:00" }
];

// Create sorter and apply strategies
const sorter = new BusSorter(new SortByFare());
console.log("Sorted by Fare:", sorter.sort([...buses]));

sorter.setStrategy(new SortByTime());
console.log("Sorted by Time:", sorter.sort([...buses]));
