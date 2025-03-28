const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const connectDB = require("./config/db");

dotenv.config();
const app = express();

app.use(cors());
app.use(express.json());

// Routes
app.use("/api/auth", require("./routes/authRoutes"));
app.use("/api/buses", require("./routes/busRoutes"));
app.use("/api/bookings", require("./routes/bookingRoutes"));



if (require.main === module) {
  connectDB();
  const PORT = process.env.PORT || 5001;
  app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
}

module.exports = app;
