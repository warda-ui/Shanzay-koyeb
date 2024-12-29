const mongoose = require("mongoose");

// Define the user schema
const userSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: true,
    trim: true,
  },
  lastName: {
    type: String,
    required: true,
    trim: true,
  },
  
  email: {
    type: String,
    required: true,
    unique: true, // Ensure no duplicate emails
    lowercase: true,
    trim: true,
  },
  phone: {
    type: String,
    required: true,
    trim: true,
  },
  address: {
    type: String,
    required: true,
    trim: true,
  },
  userCategory: {
    type: String,
    enum: ["standard-user", "admin-user"], // Restrict values
    required: true,
  },
  password: {
    type: String,
    required: true,
    minlength: 6, // Password should have a minimum length
  },
  terms: {
    type: Boolean,
    required: true,
    default: false,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

// Export the model
const User = mongoose.model("User", userSchema);

module.exports = User;
