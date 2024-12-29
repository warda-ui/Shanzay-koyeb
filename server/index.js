const express = require("express");
const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const cors = require("cors");
const jwt = require("jsonwebtoken");
const User = require("./models/user.models"); // Import the User model

const app = express();
const PORT = 5000;

// Middleware
app.use(express.json()); // Parse incoming JSON data
app.use(cors()); // Allow cross-origin requests

// MongoDB Connection
mongoose
  .connect("mongodb://127.0.0.1:27017/SignUp", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.error("MongoDB connection error:", err));

// API Route for User Registration
app.post("/api/register", async (req, res) => {
  try {
    const { firstName, lastName, email, phone, address, userCategory, password, terms } = req.body;

    // Validation: Check for required fields
    if (!firstName || !lastName || !email || !phone || !address || !userCategory || !password || !terms) {
      return res.status(400).json({ message: "All fields are required and terms must be accepted." });
    }

    // Check if the email already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "Email already exists!" });
    }

    // Hash the password before saving
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create a new user document
    const newUser = new User({
      firstName,
      lastName,
      email,
      phone,
      address,
      userCategory,
      password: hashedPassword,
      terms,
    });

    // Save the user to the database
    await newUser.save();

    res.status(201).json({ message: "User registered successfully!" });
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ message: "Server error. Please try again later." });
  }
});

// API Route for User Login
app.post("/api/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    // Validation: Check if email and password are provided
    if (!email || !password) {
      return res.status(400).json({ message: "Email and password are required." });
    }

    // Check if user exists
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: "Invalid email or password." });
    }

    // Compare entered password with hashed password in DB
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid email or password." });
    }

    // Create JWT token
    const token = jwt.sign({ userId: user._id }, "your-jwt-secret", { expiresIn: "1h" });

    // Send success response with JWT token
    res.status(200).json({ message: "Login successful!", token });
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ message: "Server error. Please try again later." });
  }
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
