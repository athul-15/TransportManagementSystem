import { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import axiosInstance from '../axiosConfig';

const Login = () => {
  const [formData, setFormData] = useState({ email: '', password: '' });
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axiosInstance.post("/auth/login", formData);
      console.log("✅ Login Response:", res.data);

      const { token, user } = res.data;
  
      if (!token || !user) {
        alert("Login failed. Incomplete data.");
        return;
      }
  
      // Save token
      localStorage.setItem("token", token);
      localStorage.setItem("role", res.data.user.role); // stores "admin" or "user"

  
      // 👇 Role check: Admin or User
      if (user.role === "admin") {
        navigate("/admin");
      } else {
        navigate("/buses");
      }
      
  
    } catch (error) {
      console.error("❌ Login error:", error.response?.data || error.message);
      alert("Login failed. Please try again.");
    }
  };
  
  
  

  return (
    <div className="max-w-md mx-auto mt-20">
      <form onSubmit={handleSubmit} className="bg-white p-6 shadow-md rounded">
        <h1 className="text-2xl font-bold mb-4 text-center">Login</h1>
        <input
          type="email"
          placeholder="Email"
          value={formData.email}
          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
          className="w-full mb-4 p-2 border rounded"
        />
        <input
          type="password"
          placeholder="Password"
          value={formData.password}
          onChange={(e) => setFormData({ ...formData, password: e.target.value })}
          className="w-full mb-4 p-2 border rounded"
        />
        <button type="submit" className="w-full bg-blue-600 text-white p-2 rounded">
          Login
        </button>
      </form>
    </div>
  );
};

export default Login;
