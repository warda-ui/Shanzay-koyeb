import React, { useState } from "react";
import { Link } from 'react-router-dom';
import "./loginstyle.css"; // Link your CSS file for styling

const LoginForm = () => {
  // State variables for form fields
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  // Handle form field changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    console.log("Login Data Sent:", formData); // Check the data sent to backend

    try {
      // Send POST request to the backend
      const response = await fetch("http://localhost:5000/api/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData), // Send the data in the body
      });

      const result = await response.json();
      console.log("Server Response:", result);

      if (result.token) {
        alert("Login successful!");
        // You can now store the token in localStorage/sessionStorage or context for later use
        // Example: localStorage.setItem('token', result.token);
      } else {
        alert(result.message || "Invalid email or password.");
      }
    } catch (error) {
      console.error("Error during login:", error);
      alert("Something went wrong. Please try again later.");
    }
  };

  // Handle forgot password click (open popup or redirect to password recovery)
  const handleForgotPassword = () => {
    alert("Redirecting to password recovery page..."); // Implement actual recovery logic or page redirect
    // For example, you can redirect to a password recovery page:
    // history.push("/forgot-password");
  };

  return (
    <div className="login-container">
      <div className="login-card">
        <h2>Log In</h2>
        <form onSubmit={handleSubmit}>
          {/* Email field */}
          <div className="form-group">
            <label>Email</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Enter your email"
              required
            />
          </div>
          {/* Password field */}
          <div className="form-group">
            <label>Password</label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="Enter your password"
              required
            />
          </div>
          <button type="submit" className="btn-login"> {/* Change btn-submit to btn-login */}
            Log In
          </button>
        </form>
        <div className="forgot-password">
          <p className="signup-link">
          Don't have an account? <Link to="/signup">Sign Up</Link> {/* Corrected route */}
          </p>
          <p>
            <a href="#" onClick={handleForgotPassword}>
              Forgot Password?
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default LoginForm;
