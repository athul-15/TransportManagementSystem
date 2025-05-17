import React, { useState } from "react";
import axios from "../axiosConfig";

const AddBus = () => {
  const [form, setForm] = useState({
    busNumber: "",
    from: "",
    to: "",
    departureTime: "",
    date: "",
    seatsAvailable: 15,
    fare: 40
  });

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("/buses", form);
      alert("Bus added!");
    } catch (err) {
      alert("Failed to add bus");
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Add Bus</h2>
      <input name="busNumber" placeholder="Bus Number" onChange={handleChange} />
      <input name="from" placeholder="From" onChange={handleChange} />
      <input name="to" placeholder="To" onChange={handleChange} />
      <input name="departureTime" placeholder="Time" onChange={handleChange} />
      <input name="date" type="date" onChange={handleChange} />
      <input name="seatsAvailable" type="number" placeholder="Seats Available" onChange={handleChange} />
      <input name="fare" type="number" placeholder="Fare" onChange={handleChange} />
      <button type="submit">Add</button>
    </form>
  );
};

export default AddBus;
