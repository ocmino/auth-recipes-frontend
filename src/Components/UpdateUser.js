import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

function UpdateUser() {

const [id, setId] = useState("");
const [username, setUsername] = useState("");
const [email, setEmail] = useState("");
const [password, setPassword] = useState("");
const [role, setRole] = useState("");
const [message, setMessage] = useState("");
const [messageColor, setMessageColor] = useState("");

const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem("token");
    try {
        const res = await axios.put(`http://localhost:8080/api/v1/users/update-user/${id}`, {
            username: username,
            email: email,
            password: password,
            role: role,
        }, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        setMessage("User updated");
        setMessageColor("text-green-500");
        setId("");
        setUsername("");
        setEmail("");
        setPassword("");
        setRole("");
    } catch (err) {
        if (err.response.status === 403) {
            setMessage("You are not authorized to update this user.");
            setMessageColor("text-red-500");
        } else {
            setMessage("An error occurred. Please try again later.");
            setMessageColor("text-red-500");
            console.log(err);
        }
    }
};



return (
    <div className="flex flex-col items-center justify-center h-screen">
        <div className="bg-white rounded-lg shadow-lg p-10">
            <h1 className="text-3xl font-bold mb-5">Update User</h1>
            <form onSubmit={handleSubmit}>
                <div className="mb-5">
                    <label className="block mb-2 text-sm font-bold text-gray-700" htmlFor="id">ID</label>
                    <input className="border border-gray-400 p-2 w-full" type="text" id="id" name="id" value={id} onChange={(e) => setId(e.target.value)} />
                </div>
                <div className="mb-5">
                    <label className="block mb-2 text-sm font-bold text-gray-700" htmlFor="username">Username</label>
                    <input className="border border-gray-400 p-2 w-full" type="text" id="username" name="username" value={username} onChange={(e) => setUsername(e.target.value)} />
                </div>
                <div className="mb-5">
                    <label className="block mb-2 text-sm font-bold text-gray-700" htmlFor="email">Email</label>
                    <input className="border border-gray-400 p-2 w-full" type="text" id="email" name="email" value={email} onChange={(e) => setEmail(e.target.value)} />
                </div>

                <div className="mb-5">
                    <label className="block mb-2 text-sm font-bold text-gray-700" htmlFor="password">Password</label>
                    <input className="border border-gray-400 p-2 w-full" type="password" id="password" name="password" value={password} onChange={(e) => setPassword(e.target.value)} />
                </div>

                <div className="mb-5">
                    <label className="block mb-2 text-sm font-bold text-gray-700" htmlFor="role">Role</label>
                    <input className="border border-gray-400 p-2 w-full" type="text" id="role" name="role" value={role} onChange={(e) => setRole(e.target.value)} />
                </div>
                <div className="mb-5">
                    <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" type="submit">Update User</button>
                </div>
            </form>
            <p className={`${messageColor} text-center`}>{message}</p>
            <Link to="/dashboard" className="text-blue-500 hover:text-blue-700 text-center block mt-5">Back to Dashboard</Link>
        </div>
    </div>
);

}

export default UpdateUser;