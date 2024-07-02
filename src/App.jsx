import { useState } from "react";
import "./App.css";
import React from "react";
import UserInfo from "./components/UserInfo";
import { AuthProvider } from "./components/AuthContext";

const App = () => {
  const userData = {
    id: "",
    name: "",
    email: "",
    totalSpent: "",
  };

  return (
    <AuthProvider>
      <div>
        <UserInfo {...userData} />
      </div>
    </AuthProvider>
  );
};

export default App;
