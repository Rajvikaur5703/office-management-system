import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

function Login() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ username: "", password: "" });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleLogin = (e) => {
    e.preventDefault();
    const { username, password } = formData;

    if (username === "admin" && password === "1234") {
      navigate("/admin/dashboard");
    } else if (username === "employee" && password === "5678") {
      navigate("/dashboard");
    } else {
      alert("Invalid credentials. Try again!");
    }
  };

  return (
    <div className="container-fluid vh-100 d-flex align-items-center justify-content-center bg-light">
      <div className="card shadow-lg border-0" style={{ maxWidth: "400px", width: "100%" }}>
        <div className="card-body p-5">
          <h2 className="text-center fw-bold mb-4 text-primary">Welcome Back</h2>
          <p className="text-center text-muted mb-4">Please enter your details</p>
          
          <form onSubmit={handleLogin}>
            {/* Username Field */}
            <div className="form-floating mb-3">
              <input
                name="username"
                type="text"
                className="form-control"
                id="userInput"
                placeholder="Username"
                value={formData.username}
                onChange={handleChange}
                required
              />
              <label htmlFor="userInput">Username</label>
            </div>

            {/* Password Field */}
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
        <div className="card-footer bg-white py-3 text-center border-0">
          <small className="text-muted">ERP System v1.0</small>
        </div>
      </div>
    </div>
  );
}

export default Login;