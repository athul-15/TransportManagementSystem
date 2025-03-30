const User = require("../models/User");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

// Generate JWT
const generateToken = (id) =>
  jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: "7d" });

// @route POST /api/auth/register
// @route POST /api/auth/register
const register = async (req, res) => {
  const { name, email, password, role } = req.body;

  const exists = await User.findOne({ email });
  if (exists) return res.status(400).json({ message: "User already exists" });

  const user = await User.create({
    name,
    email,
    password, // ✅ no hashing here
    role: role || "user",
  });

  res.status(201).json({
    token: generateToken(user._id),
    user: {
      id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
    },
  });
};

// GET - fetch user profile
const getProfile = async (req, res) => {
  const user = await User.findById(req.user.id);
  if (!user) return res.status(404).json({ message: 'User not found' });

  res.json({ name: user.name, email: user.email });
};

// PUT - update profile
const updateProfile = async (req, res) => {
  const user = await User.findById(req.user.id);
  if (!user) return res.status(404).json({ message: 'User not found' });

  const { name, email, password } = req.body;
  user.name = name || user.name;
  user.email = email || user.email;
  if (password) user.password = password;

  const updatedUser = await user.save();
  res.json({ message: 'Profile updated', name: updatedUser.name, email: updatedUser.email });
};

// @route POST /api/auth/login
const login = async (req, res) => {
    const { email, password } = req.body;
  
    const user = await User.findOne({ email });
  
    if (!user) {
      return res.status(401).json({ message: "User not found" });
    }
  
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ message: "Invalid credentials" });
    }
  
    // ✅ Full login response with user info
    return res.status(200).json({
      token: generateToken(user._id),
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role || "user", // Default to "user" if undefined
      },
    });
  };
  
  
  
  

module.exports = { register, login };
