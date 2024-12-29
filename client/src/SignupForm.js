import React, { useState } from "react";
import { Link } from 'react-router-dom';
import "./registerstyle.css"; // Link your CSS file here

const SignupForm = () => {
  // State variables for form fields
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    username: "", // Added username field
    email: "",
    phone: "",
    userCategory: "",
    password: "",
    confirmPassword: "",
    terms: false,
  });

  // Popup visibility state
  const [showPopup, setShowPopup] = useState(false);

  // Handle form field changes
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (formData.password !== formData.confirmPassword) {
      alert("Passwords do not match!");
      return;
    }

    console.log("Form Data Sent:", formData); // Check the data sent to backend

    try {
      const response = await fetch("http://localhost:5000/api/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const result = await response.json();
      console.log("Server Response:", result);

      // Show the popup regardless of server response
      setShowPopup(true);

      setTimeout(() => {
        setShowPopup(false);
        setFormData({
          firstName: "",
          lastName: "",
          username: "", // Clear username
          email: "",
          phone: "",
          userCategory: "",
          password: "",
          confirmPassword: "",
          terms: false,
        });
      }, 3000);
    } catch (error) {
      console.error("Error during registration:", error);
      alert("Something went wrong. Please try again later.");
    }
  };

  return (
    <div className="signup-container">
      <div className="signup-card">
        <h2>Sign Up</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-row">
            <div className="form-group">
              <label>First Name</label>
              <input
                type="text"
                name="firstName"
                value={formData.firstName}
                onChange={handleChange}
                placeholder="Enter your first name"
                required
              />
            </div>
            <div className="form-group">
              <label>Last Name</label>
              <input
                type="text"
                name="lastName"
                value={formData.lastName}
                onChange={handleChange}
                placeholder="Enter your last name"
                required
              />
            </div>
          </div>
          {/* Added User Name field */}
          <div className="form-group">
            <label>User Name</label>
            <input
              type="text"
              name="username"
              value={formData.username}
              onChange={handleChange}
              placeholder="Enter your user name"
              required
            />
          </div>
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
          <div className="form-group">
            <label>Phone Number</label>
            <input
              type="tel"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              placeholder="Enter your phone number"
              required
            />
          </div>
          <div className="user-category-container">
  <label htmlFor="user-category" className="user-category-label">
    User Category
  </label>
  <select
    id="user-category"
    name="userCategory"
    value={formData.userCategory}
    onChange={handleChange}
    required
    className="user-category-select"
  >
    <option value="" disabled>
      Select a category
    </option>
    <option value="standard-user">Standard User</option>
    <option value="admin-user">Admin User</option>
  </select>
</div>

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
          <div className="form-group">
            <label>Confirm Password</label>
            <input
              type="password"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
              placeholder="Re-enter your password"
              required
            />
          </div>
          <div className="form-group">
            <input
              type="checkbox"
              name="terms"
              checked={formData.terms}
              onChange={handleChange}
              required
            />
            <label>
              I agree to the{" "}
              <a href="#" className="terms-link">
                Terms and Conditions
              </a>
            </label>
          </div>
          <button type="submit" className="btn-submit">
            Sign Up
          </button>
        </form>
        <p className="login-link">
        Already have an account? <Link to="/">Log in</Link> {/* Link updated */}
        </p>
      </div>

      {/* Popup Message */}
      {showPopup && (
        <div className="popup-message">User Registered Successfully!</div>
      )}
    </div>
  );
};

export default SignupForm;
