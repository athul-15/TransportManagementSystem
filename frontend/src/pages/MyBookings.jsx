import React, { useEffect, useState } from "react";
import axios from "../axiosConfig";

const MyBookings = () => {
  const [bookings, setBookings] = useState([]);

  const fetchBookings = async () => {
    const res = await axios.get("/bookings/user");
    setBookings(res.data);
  };

  const cancelBooking = async (id) => {
    try {
      await axios.delete(`/bookings/${id}`);
      fetchBookings();
      alert("Booking cancelled!");
    } catch (err) {
      alert("Failed to cancel");
    }
  };

  useEffect(() => {
    fetchBookings();
  }, []);

  return (
    <div>
      <h2>My Bookings</h2>
      <ul>
        {bookings.map((b) => (
          <li key={b._id}>
            {b.bus.busNumber} - Seat {b.seatNumber} | {new Date(b.bookingDate).toLocaleString()}
            <button onClick={() => cancelBooking(b._id)}>Cancel</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default MyBookings;
