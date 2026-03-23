import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios"; // Make sure to npm install axios

function Login() {
  const navigate = useNavigate();

  // 1. State for Form Data and Errors
  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });
  const [errorMessage, setErrorMessage] = useState("");

  // 2. Handle Input Changes
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  // 3. Handle Form Submission
  const handleLogin = async (e) => {
    e.preventDefault();
    setErrorMessage(""); // Clear previous errors

    try {
      // Call your backend login endpoint
      const response = await axios.post("http://localhost:5000/api/auth/login", {
        email: formData.username,
        password: formData.password,
      });

      // Save token and user info to localStorage
      const { token, user } = response.data;
      localStorage.setItem("token", token);
      localStorage.setItem("role", user.role);

      // 4. Redirect based on role
      if (user.role === "admin") {
        navigate("/admin/dashboard");
      } else {
        navigate("/employee/dashboard");
      }
      
    } catch (err) {
      // Handle errors (Invalid credentials, server down, etc.)
      setErrorMessage(err.response?.data?.message || "Login failed. Try again.");
    }
  };

  return (
    <div className="container-fluid vh-100 d-flex align-items-center justify-content-center bg-light">
      <div className="card shadow-lg border-0" style={{ maxWidth: "400px", width: "100%" }}>
        <div className="card-body p-5">
          <h2 className="text-center fw-bold mb-4 text-primary">Welcome Back</h2>
          <p className="text-center text-muted mb-4">Office Management System</p>

          {/* Error message display */}
          {errorMessage && (
            <div className="alert alert-danger py-2 text-center" role="alert">
              {errorMessage}
            </div>
          )}

          <form onSubmit={handleLogin}>
            <div className="form-floating mb-3">
              <input
                name="username"
                type="text"
                className="form-control"
                id="userInput"
                placeholder="Email/Username"
                value={formData.username}
                onChange={handleChange}
                required
              />
              <label htmlFor="userInput">Username (Email)</label>
            </div>

            <div className="form-floating mb-4">
              <input
                name="password"
                type="password"
                className="form-control"
                id="passInput"
                placeholder="Password"
                value={formData.password}
                onChange={handleChange}
                required
              />
              <label htmlFor="passInput">Password</label>
            </div>

            <button className="btn btn-primary w-100 py-2 fw-bold shadow-sm" type="submit">
              Login
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Login;