import React, { useState } from "react";
import { Link, Navigate } from "react-router-dom";
import axios from "axios";

export default function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [isSignedIn, setIsSignedIn] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsLoading(true);
    const data = { username, password };
    axios
      .post("http://localhost:8080/api/v1/auth/authenticate", data)
      .then((res) => {
        localStorage.setItem("token", res.data.token);
        localStorage.setItem("expiration", res.data.expiration);
        const currentTime = Date.now();
        if (currentTime > res.data.expiration) {
          alert("Your session has expired. Please login again.");
          setIsSignedIn(false);
        } else {
          setIsSignedIn(true);
        }
        setIsLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setIsLoading(false);
      });
  };


  if (isSignedIn) {
    const expiration = localStorage.getItem("expiration");
    if (expiration && Date.now() > expiration) {
      localStorage.removeItem("token");
      localStorage.removeItem("expiration");
      alert("Your session has expired. Please login again.");
      return <Navigate to="/login" />;
    } else {
      return <Navigate to="/dashboard" />;
    }
  }

return (
  <div className="flex items-center justify-center h-screen">
    <div className="w-full max-w-xs">
    <h1 className="text-4xl font-bold mb-4 text-center">Login</h1>  
      <form
        className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4"
        onSubmit={handleSubmit}
      >
        <div className="mb-4">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="username"
          >
            Username
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="username"
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>
        <div className="mb-6">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="password"
          >
            Password
          </label>
          <input
            className="shadow appearance-none border border-red-500 rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
            id="password"
            type="password"
            placeholder="******************"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <p className="text-red-500 text-xs italic">Please choose a password.</p>
        </div>
        <div className="flex items-center justify-between">
          <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            type="submit"
          >
            {isLoading ? "Loading..." : "Login"}
          </button>
          <Link
            className="inline-block align-baseline font-bold text-sm text-blue-500 hover:text-blue-800"
            to="/register"
          >
            Register
          </Link>
        </div>
      </form>
    </div>
  </div>
);
}


