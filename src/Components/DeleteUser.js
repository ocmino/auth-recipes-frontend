//DELETE method for user, http://localhost:8080/api/v1//delete-user/{id}

import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

function DeleteUser() {
    const [id, setId] = useState("");
    const [message, setMessage] = useState("");
    const [messageColor, setMessageColor] = useState("");
    const [users, setUsers] = useState([]);
    
    const handleSubmit = async (e) => {
        e.preventDefault();
        const token = localStorage.getItem("token");
        try {
            const res = await axios.delete(`http://localhost:8080/api/v1/users/delete-user/${id}`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            setMessage(res.data);
            setMessageColor("text-green-500");
        } catch (err) {
            if (err.response.status === 403) {
                setMessage("You are not authorized to delete this user.");
                setMessageColor("text-red-500");
            } else {
                setMessage("An error occurred. Please try again later.");
                setMessageColor("text-red-500");
                console.log(err);
            }
        }
    };

    useEffect(() => {
        const fetchUsers = async () => {
            const token = localStorage.getItem("token");
            try {
                const res = await axios.get("http://localhost:8080/api/v1/users/get-all-users", {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });
                setUsers(res.data);
            } catch (err) {
                if (err.response.status === 403) {
                    setMessage("You are not authorized to view the users.");
                    setMessageColor("text-red-500");
                } else {
                    setMessage("An error occurred. Please try again later.");
                    setMessageColor("text-red-500");
                    console.log(err);
                }
            }
        };
        fetchUsers();
    }, []);
    
    
    return (
        <div className="bg-blue-500 flex flex-col items-center justify-center min-h-screen py-2">
            <div className="bg-white p-6 rounded-lg w-full flex-1">
                <h1 className="text-2xl font-bold text-center">Delete User</h1>
                <form className="pt-4" onSubmit={handleSubmit}>
                    <div className="mb-4">
                        <input
                            className="border border-gray-400 p-2 rounded-lg w-full"
                            type="text"
                            placeholder="Enter User ID"
                            value={id}
                            onChange={(e) => setId(e.target.value)}
                        />
                    </div>
                    <button className="bg-red-500 text-white py-2 px-4 rounded-lg hover:bg-red-600">
                        Delete User
                    </button>
                </form>
                <div className="pt-4">
                    <h2 className="text-xl font-bold text-center">Users</h2>
                    <div className="pt-4">
                        <table className="table-auto">
                            <thead>
                                <tr>
                                    <th className="px-4 py-2">ID</th>
                                    <th className="px-4 py-2">Username</th>
                                    <th className="px-4 py-2">Email</th>
                                    <th className="px-4 py-2">Role</th>
                                </tr>
                            </thead>
                            <tbody>
                                {users.map((user) => (
                                    <tr key={user.id}>
                                        <td className="border px-4 py-2">{user.id}</td>
                                        <td className="border px-4 py-2">{user.username}</td>
                                        <td className="border px-4 py-2">{user.email}</td>
                                        <td className="border px-4 py-2">{user.role}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
                <div className={`pt-4 text-center ${messageColor}`}>{message}</div>
                <div className="pt-4">
                    <Link to="/dashboard" className="text-blue-500 hover:underline">
                        Back
                    </Link>
                </div>
            </div>
        </div>
    );
}

export default DeleteUser;