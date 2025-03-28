import { Link } from "react-router-dom";
import Navbar from "../components/Navbar";
const AdminDashboard = () => {
  return (
    <div className="p-6 max-w-4xl mx-auto text-center">
      <h1 className="text-3xl font-bold mb-6">Admin Dashboard</h1>

      <div className="flex flex-col space-y-4">
        <Link to="/add-bus" className="bg-blue-600 text-white p-3 rounded hover:bg-blue-700">
          ➕ Add New Bus
        </Link>
        <Link to="/buses" className="bg-green-600 text-white p-3 rounded hover:bg-green-700">
          📋 View All Buses
        </Link>
        {/* Optional future features */}
        <Link to="/admin/bookings">View All Bookings</Link>
        <Link to="/admin/users">View All Users</Link>
      </div>
    </div>
  );
};

export default AdminDashboard;
