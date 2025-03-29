import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Navbar = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <nav className="bg-blue-600 text-white p-4 flex justify-between items-center">
      <Link to="/" className="text-2xl font-bold">TRANSPORT MANAGEMENT</Link>

      <div className="flex items-center space-x-4">
        {user ? (
          <>
            {user.role === "admin" && (
              <Link to="/add-bus" className="hover:underline">Admin Panel</Link>
            )}
            {user.role === "user" && (
              <>
                <Link to="/buses" className="hover:underline">Buses</Link>
                <Link to="/my-bookings" className="hover:underline">My Bookings</Link>
              </>
            )}
            <Link to="/profile" className="hover:underline">Profile</Link>
            <span className="italic text-sm text-gray-200">({user.role})</span>
            <button
              onClick={handleLogout}
              className="bg-red-500 px-4 py-2 rounded hover:bg-red-700"
            >
              Logout
            </button>
          </>
        ) : (
          <>
            <Link to="/login" className="hover:underline">Login</Link>
            <Link
              to="/register"
              className="bg-green-500 px-4 py-2 rounded hover:bg-green-700"
            >
              Register
            </Link>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
