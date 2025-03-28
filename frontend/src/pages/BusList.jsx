import React, { useEffect, useState } from "react";
import axios from "../axiosConfig";
//  import { useNavigate } from "react-router-dom";
import { useNavigate, Link } from "react-router-dom";


const BusList = () => {
    const navigate = useNavigate();
  const [buses, setBuses] = useState([]);
  const [filters, setFilters] = useState({ from: "", to: "", date: "" });
  const role = localStorage.getItem("role");

const fetchBuses = async () => {
 const params = new URLSearchParams();
    if (filters.from) params.append("from", filters.from);
    if (filters.to) params.append("to", filters.to);
    if (filters.date) params.append("date", filters.date);

    const res = await axios.get(`/buses?${params.toString()}`);
    setBuses(res.data);
  };

  useEffect(() => {
    fetchBuses();
  }, []);

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this bus?")) return;
    try {
      await axios.delete(`/buses/${id}`);
      setBuses(buses.filter((bus) => bus._id !== id));
      alert("Bus deleted");
    } catch (err) {
      alert("Delete failed");
    }
  };

  const cardStyle = {
    border: "1px solid #ddd",
    padding: "15px",
    borderRadius: "8px",
    backgroundColor: "#f9f9f9",
    boxShadow: "0 2px 6px rgba(0,0,0,0.1)",
    transition: "transform 0.2s",
  };

  const deleteButtonStyle = {
    marginTop: "10px",
    padding: "6px 12px",
    backgroundColor: "#d9534f",
    color: "#fff",
    border: "none",
    borderRadius: "4px",
    cursor: "pointer",
    transition: "background-color 0.3s ease",
  };

  const deleteButtonHoverStyle = {
    backgroundColor: "#c9302c",
  };

  return (
    <div style={{ padding: "20px" }}>
        {role === "user" && (
  <div style={{ marginBottom: "20px" }}>
    <Link
      to="/my-bookings"
      style={{
        backgroundColor: "#007bff",
        color: "#fff",
        padding: "8px 16px",
        borderRadius: "6px",
        textDecoration: "none",
      }}
    >
      View My Booking History
    </Link>
  </div>
)}
      <h2 style={{ color: "#333", marginBottom: "20px" }}>Available Buses</h2>
      

      {/* 🔍 Search Form */}
      <form
        onSubmit={(e) => {
          e.preventDefault();
          fetchBuses();
        }}
        style={{ marginBottom: "20px" }}
      >
        <input
          placeholder="From"
          value={filters.from}
          onChange={(e) => setFilters({ ...filters, from: e.target.value })}
          style={{ marginRight: "10px" }}
        />
        <input
          placeholder="To"
          value={filters.to}
          onChange={(e) => setFilters({ ...filters, to: e.target.value })}
          style={{ marginRight: "10px" }}
        />
        <input
          type="date"
          value={filters.date}
          onChange={(e) => setFilters({ ...filters, date: e.target.value })}
          style={{ marginRight: "10px" }}
        />
        <button type="submit">Search</button>
      </form>

      {/* 🚌 Bus Cards */}
      <div style={{ display: "grid", gap: "20px", maxWidth: "800px", margin: "0 auto" }}>
        {buses.map((bus) => (
          <div
            key={bus._id}
            style={cardStyle}
            onMouseOver={(e) => (e.currentTarget.style.transform = "scale(1.02)")}
            onMouseOut={(e) => (e.currentTarget.style.transform = "scale(1)")}
          >
            <h3 style={{ margin: "0 0 10px 0", color: "#0056b3" }}>{bus.busNumber}</h3>
            <p><strong>Route:</strong> {bus.from} → {bus.to}</p>
            <p><strong>Time:</strong> {bus.departureTime}</p>
            <p><strong>Date:</strong> {new Date(bus.date).toLocaleDateString()}</p>
            <p><strong>Seats Available:</strong> {bus.seatsAvailable}</p>

            {role === "user" && (
  <button
    onClick={() => navigate(`/book?busId=${bus._id}`)}
    style={{
      marginTop: "10px",
      padding: "6px 12px",
      backgroundColor: "#5cb85c",
      color: "#fff",
      border: "none",
      borderRadius: "4px",
      cursor: "pointer",
    }}
  >
    Book Now
  </button>
)}


            {role === "admin" && (
              <button
                style={deleteButtonStyle}
                onMouseOver={(e) => (e.currentTarget.style.backgroundColor = deleteButtonHoverStyle.backgroundColor)}
                onMouseOut={(e) => (e.currentTarget.style.backgroundColor = deleteButtonStyle.backgroundColor)}
                onClick={() => handleDelete(bus._id)}
              >
                Delete
              </button>
            )}
          </div>
        ))}
      </div>
    </div>

    
  );
  
}
;


export default BusList;
