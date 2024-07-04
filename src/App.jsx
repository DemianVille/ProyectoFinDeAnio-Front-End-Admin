import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./App.css";
import React from "react";
import Dashboard from "./pages/Dashboard";
import Products from "./pages/Products";
import Users from "./pages/Users";
import LoginAdmin from "./pages/LoginAdmin";

const App = () => {
  const router = createBrowserRouter([
    {
      path: "/admin",
      element: <Dashboard />,
    },
    {
      path: "/admin/login",
      element: <LoginAdmin />,
    },
    {
      path: "/admin/productos",
      element: <Products />,
    },
    {
      path: "/admin/usuarios",
      element: <Users />,
    },
  ]);
  return (
    <>
      <RouterProvider router={router} />
    </>
  );
};

export default App;
