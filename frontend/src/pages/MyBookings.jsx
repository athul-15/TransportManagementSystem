import React, { useEffect, useState } from "react";
import axios from "../axiosConfig"; // custom axios instance

const MyBookings = () => {
  const [bookings, setBookings] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [currentBookingId, setCurrentBookingId] = useState(null);
  const [seatInput, setSeatInput] = useState("");

  // Fetch bookings
  const fetchBookings = async () => {
    try {
      const res = await axios.get("/bookings/user");
      setBookings(res.data);
    } catch (err) {
      alert("Failed to load bookings");
    }
  };

  // Cancel a booking
  const cancelBooking = async (id) => {
    if (!window.confirm("Cancel this booking?")) return;
    try {
      await axios.delete(`/bookings/${id}`);
      alert("Booking cancelled!");
      fetchBookings(); // refresh
    } catch (err) {
      alert("Cancel failed");
    }
  };

  // Open modal for rebooking
  const openRebookModal = (id) => {
    setCurrentBookingId(id);
    setShowModal(true);
  };

  // Submit rebook with seat number
  const submitRebook = async () => {
  if (!seatInput) return alert("Please enter a seat number");

  try {
    await axios.post(`/bookings/${currentBookingId}/clone`, {
      seatNumber: seatInput,
    });
    alert("Rebooked successfully!");
    setShowModal(false);
    setSeatInput("");
    fetchBookings();
  } catch (err) {
      alert(err.response?.data?.message || "Rebooking failed.");
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
                <strong>Bus:</strong> {b.bus?.busNumber} ({b.bus?.from} →{" "}
                {b.bus?.to})
              </p>
              <p>
                <strong>Seat:</strong> {b.seatNumber}
              </p>
              <p>
                <strong>Booked On:</strong>{" "}
                {new Date(b.bookingDate).toLocaleString()}
              </p>

              <button
                onClick={() => cancelBooking(b._id)}
                style={{
                  marginTop: "10px",
                  marginRight: "10px",
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

              <button
                onClick={() => openRebookModal(b._id)}
                style={{
                  marginTop: "10px",
                  padding: "6px 12px",
                  backgroundColor: "#0275d8",
                  color: "#fff",
                  border: "none",
                  borderRadius: "4px",
                  cursor: "pointer",
                }}
              >
                Rebook
              </button>
            </li>
          ))}
        </ul>
      )}

      {/*  Rebook Modal */}
      {showModal && (
        <div
          style={{
            position: "fixed",
            top: "30%",
            left: "35%",
            background: "#fff",
            border: "1px solid #ccc",
            padding: "20px",
            zIndex: 1000,
            borderRadius: "6px",
            boxShadow: "0px 0px 10px rgba(0,0,0,0.3)",
          }}
        >
          <h3>Rebook: Select New Seat</h3>
          <input
            type="text"
            placeholder="Enter new seat number"
            value={seatInput}
            onChange={(e) => setSeatInput(e.target.value)}
            style={{ padding: "8px", marginBottom: "10px", width: "100%" }}
          />
          <br />
          <button onClick={submitRebook} style={{ marginRight: "10px" }}>
            Confirm
          </button>
          <button onClick={() => setShowModal(false)}>Cancel</button>
        </div>
      )}
    </div>
  );
};

export default MyBookings;
