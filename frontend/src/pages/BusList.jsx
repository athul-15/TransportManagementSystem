import React, { useEffect, useState } from "react";
import axios from "../axiosConfig";

const BusList = () => {
  const [buses, setBuses] = useState([]);

  useEffect(() => {
    const fetchBuses = async () => {
      const res = await axios.get("/buses");
      setBuses(res.data);
    };
    fetchBuses();
  }, []);

  return (
    <div>
      <h2>All Buses</h2>
      <ul>
        {buses.map((bus) => (
          <li key={bus._id}>
            {bus.busNumber} - {bus.from} to {bus.to} at {bus.departureTime}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default BusList;
