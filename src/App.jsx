import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./App.css";
import React from "react";
import Dashboard from "./pages/Dashboard";
import Products from "./pages/Products";
import Users from "./pages/Users";
import LoginAdmin from "./pages/LoginAdmin";
import Error404 from "./components/Error404";
import Orders from "./pages/Orders";
import Admins from "./pages/Admins";
import Categories from "./pages/Categories";

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
      path: "/admin/categorias",
      element: <Categories />,
    },
    {
      path: "/admin/productos",
      element: <Products />,
    },
    {
      path: "/admin/usuarios",
      element: <Users />,
    },
    {
      path: "/admin/administradores",
      element: <Admins />,
    },
    {
      path: "/admin/ordenes",
      element: <Orders />,
    },
    {
      path: "*",
      element: <Error404 />,
    },
  ]);
  return (
    <>
      <RouterProvider router={router} />
    </>
  );
};

export default App;
