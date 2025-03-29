import React, { useEffect, useState } from "react";
import axios from "../axiosConfig";

const AdminBookings = () => {
  const [bookings, setBookings] = useState([]);

  useEffect(() => {
    const fetchAllBookings = async () => {
      try {
        const res = await axios.get("/bookings");  // token will be auto sent
        setBookings(res.data);
      } catch (err) {
        console.error("Error fetching bookings:", err);
      }
    };

    fetchAllBookings();
  }, []);

  return (
    <div className="p-4 max-w-5xl mx-auto">
      <h2 className="text-2xl font-bold mb-4">All Bookings</h2>
      {bookings.length === 0 ? (
        <p>No bookings found.</p>
      ) : (
        <table className="w-full border border-gray-300 text-center">
          <thead>
            <tr className="bg-gray-100">
              <th className="p-2">User Email</th>
              <th className="p-2">Bus</th>
              <th className="p-2">Route</th>
              <th className="p-2">Seat No</th>
              <th className="p-2">Booking Date</th>
            </tr>
          </thead>
          <tbody>
            {bookings.map((b) => (
              <tr key={b._id} className="border-t">
                <td className="p-2">{b.user?.email || "N/A"}</td>
                <td className="p-2">{b.bus?.busNumber}</td>
                <td className="p-2">{b.bus?.from} → {b.bus?.to}</td>
                <td className="p-2">{b.seatNumber}</td>
                <td className="p-2">{new Date(b.createdAt).toLocaleDateString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default AdminBookings;
