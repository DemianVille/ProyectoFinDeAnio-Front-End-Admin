import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./App.css";
import React from "react";
import Dashboard from "./pages/Dashboard";
import Products from "./pages/Products";
import Users from "./pages/Users";
import LoginAdmin from "./pages/LoginAdmin";
import Error404 from "./components/Error404";
import Orders from "./pages/Orders";
import ProductInfo from "./pages/ProductInfo";
import "react-toastify/dist/ReactToastify.css";


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
    {
      path: "/admin/ordenes",
      element: <Orders />,
    },
    {
      path: "/admin/productos/:id",
      element: <ProductInfo />,
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
