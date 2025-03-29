import React, { useState, useEffect } from "react";
import axios from "../axiosConfig";
import { useLocation, useNavigate } from "react-router-dom";

const BookBus = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const queryParams = new URLSearchParams(location.search);
  const preselectedBusId = queryParams.get("busId");

  const [buses, setBuses] = useState([]);
  const [selectedBus, setSelectedBus] = useState(preselectedBusId || "");
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
      navigate("/buses"); // ✅ Redirect after booking
    } catch (err) {
      alert("Booking failed: " + err.response?.data?.message);
    }
  };

  return (
    <div style={styles.container}>
      <form onSubmit={handleSubmit} style={styles.form}>
        <h2 style={styles.title}>Book a Bus</h2>

        <select
          value={selectedBus}
          onChange={(e) => setSelectedBus(e.target.value)}
          required
          style={styles.input}
        >
            
          <option value="">Select Bus</option>
          {buses.map((bus) => (
            <option key={bus._id} value={bus._id}>
              {bus.busNumber} - {bus.from} to {bus.to}
            </option>
          ))}
        </select>
        <h2 style={styles.title}>Select the seat number</h2>
        <input
          type="number"
          placeholder="Seat Number"
          value={seatNumber}
          onChange={(e) => setSeatNumber(Number(e.target.value))}
          min={1}
          max={40}
          required
          style={styles.input}
        />

        <button type="submit" style={styles.button}>
          Book Ticket
        </button>
      </form>
    </div>
  );
};

const styles = {
  container: {
    display: "flex",
    justifyContent: "center",
    padding: "50px",
  },
  form: {
    width: "100%",
    maxWidth: "400px",
    display: "flex",
    flexDirection: "column",
    gap: "20px",
    padding: "30px",
    border: "1px solid #ddd",
    borderRadius: "10px",
    boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
    backgroundColor: "#fefefe",
  },
  title: {
    marginBottom: "10px",
    textAlign: "center",
    color: "#333",
  },
  input: {
    padding: "10px",
    fontSize: "16px",
    borderRadius: "6px",
    border: "1px solid #ccc",
  },
  button: {
    padding: "10px",
    fontSize: "16px",
    backgroundColor: "#007bff",
    color: "#fff",
    border: "none",
    borderRadius: "6px",
    cursor: "pointer",
  },
};

export default BookBus;
