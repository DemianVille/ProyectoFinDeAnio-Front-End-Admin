import React from "react";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Container, Row, Col, Modal, Form } from "react-bootstrap";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import Admin from "../components/Admin";
import SideBar from "../components/SideBar";
import NavBar from "../components/NavBar";

export default function Admins() {
  const [admins, setAdmins] = useState([]);
  const [show, setShow] = useState(false);
  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const token = useSelector((state) => state.token);
  const navigate = useNavigate();

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const addAdmin = async () => {
    try {
      const options = {
        method: "POST",
        headers: {
          accept: "application/json",
          Authorization: `Bearer ${token}`,
        },
        data: {
          firstname,
          lastname,
          email,
          password,
        },
      };

      const response = await axios(`http://localhost:3000/admins`, options);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    if (!token) {
      navigate("/admin/login");
    }
  }, []);

  useEffect(() => {
    const getAdmins = async () => {
      try {
        const options = {
          method: "GET",
          headers: {
            accept: "application/json",
            Authorization: `Bearer ${token}`,
          },
        };
        const response = await fetch(`http://localhost:3000/admins`, options);
        const adminList = await response.json();
        setAdmins(adminList);
      } catch (err) {
        console.error(err);
      }
    };
    getAdmins();
  }, [admins]);

  return (
    <>
      <Row className="w-100">
        <Col xs={3} lg={2}>
          <SideBar />
        </Col>
        <Col xs={9} lg={10}>
          <NavBar />
          <Container fluid className="mb-5">
            <div className="d-flex justify-content-between my-5">
              <h3>Administradores</h3>
              <button className="botonAgregar px-3" onClick={handleShow}>
                Agregar administrador
              </button>
            </div>
            <div className="tables">
              <Row className="infoRow">
                <Col xs={2}>Id</Col>
                <Col xs={4}>Nombre completo</Col>
                <Col xs={4}>Email</Col>
              </Row>
              {admins.length === 0 ? (
                <Row className="">
                  <hr />
                  <p>Lista vacía</p>
                </Row>
              ) : (
                admins.map((admin) => {
                  return (
                    <Row className="usersRow">
                      <Admin key={admin.id} id={admin.id} />
                    </Row>
                  );
                })
              )}
            </div>
          </Container>
        </Col>
      </Row>
      <Modal show={show} onHide={handleClose}>
        <Modal.Body>
          <Form
            onSubmit={(event) => {
              event.preventDefault();
            }}
          >
            <div className="text-center mb-3 mt-3">
              <h2>Agregar administrador</h2>
            </div>
            <Form.Group className="mb-2">
              <Form.Label htmlFor="name">Nombre</Form.Label>
              <Form.Control
                id="name"
                type="text"
                aria-label="First name"
                value={firstname}
                onChange={(e) => setFirstname(e.target.value)}
              />
            </Form.Group>
            <Form.Group className="mb-2">
              <Form.Label htmlFor="lastname">Apellido</Form.Label>
              <Form.Control
                id="lastname"
                type="text"
                rows={4}
                aria-label="Last name"
                value={lastname}
                onChange={(e) => setLastname(e.target.value)}
              />
            </Form.Group>
            <Form.Group className="mb-2">
              <Form.Label htmlFor="address">Email</Form.Label>
              <Form.Control
                id="address"
                type="email"
                aria-describedby="address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </Form.Group>
            <Form.Group className="mb-2">
              <Form.Label htmlFor="password">Contraseña</Form.Label>
              <Form.Control
                id="password"
                type="text"
                placeholder="1234"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <div className="editBtn w-100 mb-3">
            <button
              className="returnToDashboard"
              onClick={() => {
                handleClose();
              }}
            >
              <i className="bi bi-caret-left"></i> Volver a usuarios
            </button>
            <div>
              <button
                className="confirmEdit mx-1"
                onClick={() => {
                  handleClose();
                  addAdmin();
                }}
              >
                Agregar
              </button>
            </div>
          </div>
        </Modal.Footer>
      </Modal>
    </>
  );
}
