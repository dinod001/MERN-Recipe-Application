import React from "react";
import NavBar from "./components/NavBar";
import { Routes, Route } from "react-router-dom";
import AuthProvider from "./context/AuthContext";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import AddRecipie from "./pages/AddRecipie";
import RecipieDetails from "./pages/RecipieDetails";

const App = () => {
  return (
    <AuthProvider>
      <NavBar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/add-recipie" element={<AddRecipie />} />
        <Route path="/recipie/:id" element={<RecipieDetails />} />
      </Routes>
    </AuthProvider>
  );
};

export default App;
