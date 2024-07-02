import { useState } from "react";
import "./App.css";
import React from "react";
import UserInfo from "./UserInfo";
import EcommerceStats from "./EcommerceStats";

const App = () => {
  const userData = {
    id: 123,
    name: "Salomon Rondon",
    email: "Salomon.R@example.com",
  };
  const totalSpent = 35;

  return (
    <div>
      <UserInfo {...userData} />
      <EcommerceStats totalSpent={totalSpent} />
    </div>
  );
};

export default App;
