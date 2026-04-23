import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

function Login() {
  const API_BASE_URL = import.meta.env.VITE_API_URL;
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ username: "", password: "" });
  const [errorMessage, setErrorMessage] = useState("");

  // Handle input changes
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Handle login
  const handleLogin = async (e) => {
    e.preventDefault();
    setErrorMessage(""); // Clear previous errors

    const { username, password } = formData;

    try {
      // Send login request
      const response = await fetch(`${API_BASE_URL}/api/auth/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: username.trim().toLowerCase(), password }),
      });

      const data = await response.json();

      if (response.ok) {
        console.log("Login success:", data);

        // Extract role from user object
        const role = data.user.role.trim().toLowerCase();

        // Store token and role in localStorage
        localStorage.setItem("token", data.token);
        localStorage.setItem("role", role);
        localStorage.setItem("user", JSON.stringify(data.user));

        // Redirect based on rolea
        if (role === "admin") {
          navigate("/admin/dashboard");
        } else if (role === "employee" || role === "user") {
          navigate("/employee/dashboard");
        } else {
          setErrorMessage("Unknown user role. Cannot redirect.");
          console.warn("Unknown role:", role);
        }
      } else {
        // If login failed
        setErrorMessage(data.msg || "Invalid credentials. Try again!");
      }
    } catch (error) {
      console.error("Login error:", error);
      setErrorMessage("Cannot connect to server. Is your backend running?");
    }
  };

  return (
    <div className="container-fluid vh-100 d-flex align-items-center justify-content-center bg-light">
      <div className="card shadow-lg border-0" style={{ maxWidth: "400px", width: "100%" }}>
        <div className="card-body p-5">
          <h2 className="text-center fw-bold mb-4 text-primary">Welcome Back</h2>
          <p className="text-center text-muted mb-4">Office Management System</p>

          {/* Error message */}
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