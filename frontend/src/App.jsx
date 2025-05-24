import React from "react";
import NavBar from "./components/NavBar";
import AuthProvider from "./context/AuthContext";

const App = () => {
  return (
    <AuthProvider>
      <NavBar />
    </AuthProvider>
  );
};

export default App;
