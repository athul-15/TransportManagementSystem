import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";
import BusList from "./pages/BusList";
import AddBus from "./pages/AddBus";
import './App.css';
import Navbar from './components/Navbar';
import Tasks from "./pages/Tasks";
import AdminDashboard from "./pages/AdminDashboard";

function App() {
  return (
    <BrowserRouter>
     <Navbar />
      <Routes>
     
        <Route
          path="/"
          element={
            <div className="text-center mt-10">
              <h1 className="text-2xl font-bold mb-4">Home Page</h1>
              {/* <Link to="/register" className="text-blue-600 underline mr-4">Register</Link>
              <Link to="/login" className="text-blue-600 underline ml-4">Login</Link> */}
            </div>
          }
        />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/buses" element={<BusList />} />
        <Route path="/add-bus" element={<AddBus />} />
        <Route path="/tasks" element={<Tasks />} />
      
      <Route path="/admin" element={<AdminDashboard />} />

      </Routes>
    </BrowserRouter>
  );
}

export default App;


