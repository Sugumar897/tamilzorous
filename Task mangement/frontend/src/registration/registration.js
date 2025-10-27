import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./registration.css";

function Registration() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("employee"); 
  const navigate = useNavigate();


const handleRegister = async (e) => {
  e.preventDefault();

  const userData = { name, email, password, role };

  try {
    const response = await fetch("http://localhost:5000/api/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(userData),
    });

    const data = await response.json();

    if (response.ok) {
    
      localStorage.setItem("token", data.token);
      alert("Registered Successfully!");
      navigate("/login");
    } else {
      alert("Registration failed: " + data.message);
    }
  } catch (error) {
    console.error("Error:", error);
    alert("Something went wrong. Please try again later.");
  }
};


  return (
    <div className="register-container">
      <h2>Registration Page</h2>
      <form className="register-form" onSubmit={handleRegister}>
        <input
          type="text"
          placeholder="Enter Full Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />

        <input
          type="email"
          placeholder="Enter Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />

        <input
          type="password"
          placeholder="Enter Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />

        {/* Role dropdown */}
        <select value={role} onChange={(e) => setRole(e.target.value)}>
          <option value="employee">Employee</option>
          <option value="admin">Admin</option>
        </select>

        <button type="submit">Register</button>
      </form>

      <p className="back-link" onClick={() => navigate("/login")}>
        ← Back to Login
      </p>
    </div>
  );
}

export default Registration;
