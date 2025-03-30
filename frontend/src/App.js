import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";
import BusList from "./pages/BusList";
import AddBus from "./pages/AddBus";
import './App.css';
import Navbar from './components/Navbar';
import Tasks from "./pages/Tasks";
import AdminDashboard from "./pages/AdminDashboard";
import BookBus from "./pages/BookBus";
import MyBookings from "./pages/MyBookings";
import TaskList from "./components/TaskList";
import AdminBookings from "./pages/AdminBookings";
//import MyBookings from "./pages/MyBookings";
import Profile from "./pages/Profile"; 
// Inside <Routes>


function App() {
  return (
    <BrowserRouter>
     <Navbar />
      <Routes>
     
        <Route
          path="/"
          element={<Login />
          }
        />
        <Route path="/profile" element={<Profile />} />
        <Route path="/my-bookings" element={<MyBookings />} />
        <Route path="/book" element={<BookBus />} />
        <Route path="/my-bookings" element={<MyBookings />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/buses" element={<BusList />} />
        <Route path="/add-bus" element={<AddBus />} />
        <Route path="/tasks" element={<Tasks />} />
      
      <Route path="/admin" element={<AdminDashboard />} />
      
  <Route path="/admin/bookings" element={<AdminBookings />} />


      </Routes>
    </BrowserRouter>
  );
}

export default App;


