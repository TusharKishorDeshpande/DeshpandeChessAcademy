// server.js
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const dotenv = require("dotenv");
const errorHandler = require("./middleware/error");

// Load env vars
dotenv.config();

const app = express();

// Middleware
app.use(
  cors({
    origin: [
      "https://deshpande-chess-academy-frontend.vercel.app/",
      "https://www.deshpandechessacademy.com/",
      "http://localhost:3000",
      "http://localhost:5173", // Vite's default port
    ],
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);
app.use(express.json());

// Routes
app.use("/api/auth", require("./routes/auth"));
app.use("/api/tournaments", require("./routes/tournaments"));
app.use("/api/contacts", require("./routes/contacts"));
app.use("/api/settings", require("./routes/settings"));
app.use("/api/testimonials", require("./routes/testimonials"));
app.use("/api/achievements", require("./routes/achievements"));

// Error handler
app.use(errorHandler);

// MongoDB Connect
mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("✅ MongoDB Connected");
  })
  .catch((err) => console.error("❌ MongoDB connection error:", err));

// For local development
if (process.env.NODE_ENV !== "production") {
  const PORT = process.env.PORT || 5000;
  app.listen(PORT, () =>
    console.log(`✅ Server running on http://localhost:${PORT}`)
  );
}

// Export the Express API for Vercel
module.exports = app;
