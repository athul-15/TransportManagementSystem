import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "../axiosConfig";

const EditBus = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [form, setForm] = useState({
    busNumber: "",
    from: "",
    to: "",
    departureTime: "",
    date: "",
    seatsAvailable: 15,
    fare: 40
  });

  useEffect(() => {
    const fetchBus = async () => {
      try {
        const res = await axios.get(`/buses/${id}`);
        setForm(res.data);
      } catch (err) {
        alert("Failed to load bus data");
      }
    };
    fetchBus();
  }, [id]);

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`/buses/${id}`, form);
      alert("Bus updated!");
      navigate("/buses"); // Or your bus list page
    } catch (err) {
      alert("Failed to update bus");
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Edit Bus</h2>
      <input name="busNumber" value={form.busNumber} placeholder="Bus Number" onChange={handleChange} />
      <input name="from" value={form.from} placeholder="From" onChange={handleChange} />
      <input name="to" value={form.to} placeholder="To" onChange={handleChange} />
      <input name="departureTime" value={form.departureTime} placeholder="Time" onChange={handleChange} />
      <input name="date" type="date" value={form.date.slice(0, 10)} onChange={handleChange} />
      <input name="seatsAvailable" type="number" value={form.seatsAvailable} placeholder="Seats Available" onChange={handleChange} />
      <input name="fare" type="number" value={form.fare} placeholder="Fare" onChange={handleChange} />
      <button type="submit">Update</button>
    </form>
  );
};

export default EditBus;
