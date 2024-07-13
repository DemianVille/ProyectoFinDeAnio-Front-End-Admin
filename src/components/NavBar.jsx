import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { deleteToken } from "../redux/tokenReducer";
import { Navbar, Nav } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

export default function NavBar() {
  const token = useSelector((state) => state.token);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  return (
    <Navbar expand="lg" className="navShadow d-flex justify-content-end">
      <Nav>
        <div className="d-flex justify-content-center align-items-end">
          <button
            className="nav-link mx-2 p-0 active text-center"
            onClick={() => {
              dispatch(deleteToken());
              navigate("/admin/login");
            }}
          >
            Cerrar sesión <i class="bi bi-box-arrow-right"></i>
          </button>
        </div>
      </Nav>
    </Navbar>
  );
}
