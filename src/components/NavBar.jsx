import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { deleteToken } from "../redux/tokenReduser";
import { Navbar, Nav, Container } from "react-bootstrap";

export default function NavBar() {
  const token = useSelector((state) => state.token);
  const dispatch = useDispatch();

  return (
    <Navbar expand="lg" className="navShadow d-flex justify-content-end">
      <Nav>
        <div className="d-flex justify-content-center align-items-end">
          <button
            className="logoutBtn nav-link mx-2 p-0 active text-center userNavBtn"
            onClick={() => dispatch(deleteToken())}
          >
            Cerrar sesión <i class="bi bi-box-arrow-right"></i>
          </button>
        </div>
      </Nav>
    </Navbar>
  );
}
