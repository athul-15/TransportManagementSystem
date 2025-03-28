import React, { useState, useEffect } from "react";
import axios from "../axiosConfig";

const BookBus = () => {
  const [buses, setBuses] = useState([]);
  const [selectedBus, setSelectedBus] = useState("");
  const [seatNumber, setSeatNumber] = useState(1);

  useEffect(() => {
    const fetchBuses = async () => {
      const res = await axios.get("/buses");
      setBuses(res.data);
    };
    fetchBuses();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("/bookings", {
        busId: selectedBus,
        seatNumber,
      });
      alert("Booking successful!");
    } catch (err) {
      alert("Booking failed: " + err.response?.data?.message);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Book a Bus</h2>

      <select value={selectedBus} onChange={(e) => setSelectedBus(e.target.value)}>
        <option value="">Select Bus</option>
        {buses.map((bus) => (
          <option key={bus._id} value={bus._id}>
            {bus.busNumber} - {bus.from} to {bus.to}
          </option>
        ))}
      </select>

      <input
        type="number"
        placeholder="Seat Number"
        value={seatNumber}
        onChange={(e) => setSeatNumber(Number(e.target.value))}
        min={1}
        max={40}
        required
      />

      <button type="submit">Book Ticket</button>
    </form>
  );
};

export default BookBus;
