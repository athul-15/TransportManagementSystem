import React, { useEffect, useState } from "react";
import axios from "../axiosConfig";

const MyBookings = () => {
  const [bookings, setBookings] = useState([]);

  const fetchBookings = async () => {
    try {
      const res = await axios.get("/bookings/user");
      setBookings(res.data);
    } catch (err) {
      alert("Failed to load bookings");
    }
  };

  const cancelBooking = async (id) => {
    if (!window.confirm("Cancel this booking?")) return;
    try {
      await axios.delete(`/bookings/${id}`);
      alert("Booking cancelled!");
      fetchBookings(); // refresh the list
    } catch (err) {
      alert("Cancel failed");
    }
  };

  useEffect(() => {
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
              <p>
                <strong>Bus:</strong> {b.bus.busNumber} ({b.bus.from} → {b.bus.to})
              </p>
              <p><strong>Seat:</strong> {b.seatNumber}</p>
              <p><strong>Booked On:</strong> {new Date(b.bookingDate).toLocaleString()}</p>
              <button
                onClick={() => cancelBooking(b._id)}
                style={{
                  marginTop: "10px",
                  padding: "6px 12px",
                  backgroundColor: "#d9534f",
                  color: "#fff",
                  border: "none",
                  borderRadius: "4px",
                  cursor: "pointer",
                }}
              >
                Cancel Booking
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default MyBookings;

