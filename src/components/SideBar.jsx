import React from "react";
import { Image } from "react-bootstrap";
import { Link } from "react-router-dom";

export default function SideBar() {
  return (
    <>
      <div className="sideBar body">
        <div className="logoInfo">
          <div className="logotipo">
            <Image className="logoImg" src="/src/assets/Logo.png" alt="" />
          </div>
          <h2 className="m-0 fontPlaywrite">Copéllia</h2>
        </div>
        <div className="d-flex flex-column">
          <Link to={"/admin"} className="w-100">
            <button className="adminBtns my-3 p-2 w-75">Dashboard</button>
          </Link>
          <Link to={"/admin/productos"} className="w-100">
            <button className="adminBtns my-3 p-2 w-75">Productos</button>
          </Link>
          <Link to={"/admin/usuarios"} className="w-100">
            <button className="adminBtns my-3 p-2 w-75">Usuarios</button>
          </Link>
        </div>
      </div>
    </>
  );
}
