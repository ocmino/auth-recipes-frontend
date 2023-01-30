import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Login from "./Components/Login";
import Register from "./Components/Register";
import Dashboard from "./Components/Dashboard";
import Recipes from "./Components/Recipes";
import Protected from "./Components/Protected";
import Recipe from "./Components/Recipe";
import DeleteUser from "./Components/DeleteUser";
import UpdateUser from "./Components/UpdateUser";

export default function App() {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route path="/dashboard" element={<Protected><Dashboard /></Protected>} />
                <Route path="/recipes" element={<Protected><Recipes /></Protected>} />
                <Route path="/recipe" element={<Protected><Recipe /></Protected>} />
                <Route path="/deleteuser" element={<Protected><DeleteUser /></Protected>} />
                <Route path="/updateuser" element={<Protected><UpdateUser /></Protected>} />
            </Routes>
        </Router>
    );
}