import React, { useEffect, useState } from "react";
import axios from "../axiosConfig";

const MyBookings = () => {
  const [bookings, setBookings] = useState([]);

  useEffect(() => {
    const fetchBookings = async () => {
      try {
        const res = await axios.get("/bookings/user");
        setBookings(res.data);
      } catch (err) {
        alert("Failed to load bookings");
      }
    };
    fetchBookings();
  }, []);

  return (
    <div style={{ padding: "20px" }}>
      <h2 style={{ marginBottom: "20px" }}>My Booking History</h2>
      {bookings.length === 0 ? (
        <p>No bookings found.</p>
      ) : (
        <ul style={{ listStyle: "none", padding: 0 }}>
          {bookings.map((b) => (
            <li
              key={b._id}
              style={{
                marginBottom: "15px",
                border: "1px solid #ccc",
                padding: "10px",
                borderRadius: "6px",
                background: "#fdfdfd",
              }}
            >
              <strong>Bus:</strong> {b.bus.busNumber} ({b.bus.from} → {b.bus.to})<br />
              <strong>Seat:</strong> {b.seatNumber}<br />
              <strong>Date:</strong> {new Date(b.bookingDate).toLocaleDateString()}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default MyBookings;
