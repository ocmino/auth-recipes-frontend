import React, { useState } from "react";
import { Navigate } from "react-router-dom";
import axios from "axios";

export default function Register() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isSignedIn, setIsSignedIn] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!username || !email || !password) {
      setError("All fields are required.");
    } else if (password.length < 8) {
      setError("Password must be at least 8 characters long.");
    } else {
      const data = { username, email, password };
      axios
        .post("http://localhost:8080/api/v1/auth/register", data)
        .then((res) => {
          localStorage.setItem("token", res.data.token);
          setIsSignedIn(true);
        })
        .catch((err) => console.log(err));
    }
  };

  if (isSignedIn) {
    return <Navigate to="/dashboard" />;
  }

  return (
    <div className="bg-blue-500 flex flex-col items-center justify-center min-h-screen py-2">
      <div className="bg-white p-6 rounded-lg w-full flex-1">
        <h1 className="text-2xl font-bold text-center">Register</h1>
        <form className="pt-4" onSubmit={handleSubmit}>
          <div className="mb-4">
            <input
              className="border border-gray-400 p-2 rounded-lg w-full"
              type="text"
              placeholder="Enter Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>
          <div className="mb-4">
            <input
              className="border border-gray-400 p-2 rounded-lg w-full"
              type="email"
              placeholder="Enter Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="mb-4">
            <input
              className="border border-gray-400 p-2 rounded-lg w-full"
              type="password"
              placeholder="Enter Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
         <button type="submit" className="bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600">
          Register
        </button>
        </form>

        
        <div className="pt-4 text-center text-red-500">
          {error && <p>{error}</p>}
        </div>
        <div className="pt-4">
          <a href="/" className="text-blue-500 hover:underline">
            Login
          </a>
        </div>
      </div>
    </div>
  );
}