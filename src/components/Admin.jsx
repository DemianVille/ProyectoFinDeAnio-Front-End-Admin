import React from "react";
import axios from "axios";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Row, Col, Modal, Form } from "react-bootstrap";
import { useSelector, useDispatch } from "react-redux";

export default function Admin({ id }) {
  const [admin, setAdmin] = useState({});
  const [show, setShow] = useState(false);
  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [password, setPassword] = useState("");
  const [deleteItem, setDeleteItem] = useState(null);
  const token = useSelector((state) => state.token);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const editAdmin = async () => {
    try {
      const options = {
        method: "PATCH",
        headers: {
          accept: "application/json",
          Authorization: `Bearer ${token}`,
        },
        data: {
          firstname,
          lastname,
          email,
          address,
          phone,
          password,
        },
      };

      const response = await axios(
        `http://localhost:3000/admins/${id}`,
        options
      );
    } catch (err) {
      console.error(err);
    }
  };
  const deleteAdmin = async () => {
    try {
      const options = {
        method: "DELETE",
        headers: {
          accept: "application/json",
          Authorization: `Bearer ${token}`,
        },
      };

      const response = await axios(
        `http://localhost:3000/admins/${id}`,
        options
      );
      setDeleteItem(response.data.message);
    } catch (err) {
      handleClose();
    }
  };

  useEffect(() => {
    const getAdmin = async () => {
      try {
        const options = {
          method: "GET",
          headers: {
            accept: "application/json",
            Authorization: `Bearer ${token}`,
          },
        };
        const response = await fetch(
          `http://localhost:3000/admins/${id}`,
          options
        );
        const adminObjet = await response.json();
        setAdmin(adminObjet);
      } catch (err) {
        console.error(err);
      }
    };
    getAdmin();
  }, [show, deleteItem]);

  return (
    <>
      <hr />
      <Col xs={2}>{admin.id}</Col>
      <Col xs={4}>{`${admin.firstname} ${admin.lastname}`}</Col>
      <Col xs={4}>{admin.email}</Col>
      <Col xs={2} className="d-flex align-items-center">
        <button className="botonEdit" onClick={handleShow}>
          Editar <i class="bi bi-pen"></i>
        </button>
      </Col>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>
            <div className="d-flex align-items-center">
              <p className="my-0 mx-3">{admin.firstname}</p>
            </div>
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form
            onSubmit={(event) => {
              event.preventDefault();
            }}
          >
            <div className="text-center mb-3 mt-3">
              <h2>Editar usuario</h2>
            </div>
            <Form.Group className="mb-2">
              <Form.Label htmlFor="name">Nombre</Form.Label>
              <Form.Control
                id="name"
                type="text"
                aria-label="First name"
                placeholder={admin.firstname}
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
                placeholder={admin.lastname}
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
                placeholder={admin.email}
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
              <button className="deleteBtn" onClick={deleteAdmin}>
                Eliminar
              </button>
              <button
                className="confirmEdit mx-1"
                onClick={() => {
                  handleClose();
                  editAdmin();
                }}
              >
                Editar
              </button>
            </div>
          </div>
        </Modal.Footer>
      </Modal>
    </>
  );
}
