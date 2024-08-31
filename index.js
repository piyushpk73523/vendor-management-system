require("dotenv").config(); // Load environment variables from .env file

const express = require("express");
const mongoose = require("mongoose");

const vendorRoutes = require("./routes/vendorRoutes");
const purchaseOrderRoutes = require("./routes/purchaseOrderRoutes");
const authRoutes = require("./routes/authRoutes");

const app = express();

// Middleware to parse JSON bodies
app.use(express.json());

// Route handling
app.use("/vendors", vendorRoutes);
app.use("/purchase-orders", purchaseOrderRoutes);
app.use("/auth", authRoutes);

// Use the MongoDB URI from environment variables
const mongoURI = process.env.MONGODB_URI;

// Connect to MongoDB with the connection string from .env file
mongoose
  .connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("Database connected"))
  .catch((err) => {
    console.error("Database connection error:", err); // Improved error message
  });

const PORT = process.env.PORT || 5000; // Use PORT from .env file

// Start server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

module.exports = app; // Export the app for testing
