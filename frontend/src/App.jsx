import React from "react";
import NavBar from "./components/NavBar";
import { Routes, Route } from "react-router-dom";
import AuthProvider from "./context/AuthContext";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import AddRecipie from "./pages/AddRecipie";

const App = () => {
  return (
    <AuthProvider>
      <NavBar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/add-recipie" element={<AddRecipie />} />
      </Routes>
    </AuthProvider>
  );
};

export default App;
