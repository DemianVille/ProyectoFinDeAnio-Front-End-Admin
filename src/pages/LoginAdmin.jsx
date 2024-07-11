import React, { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { Container, Row, Col, Form } from "react-bootstrap";

import { useSelector, useDispatch } from "react-redux";
import { createToken } from "../redux/tokenReduser";

export default function LoginAdmin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [msg, setMsg] = useState("");
  const [admin, setAdmin] = useState({});

  const notify = () => {
    toast.warn("En desarrollo");
  };

  const navigate = useNavigate();

  const token = useSelector((state) => state.token);
  const dispatch = useDispatch();

  const addToken = async () => {
    try {
      const options = {
        method: "POST",
        data: {
          email,
          password,
        },
      };

      const response = await axios(`http://localhost:3000/tokens`, options);
      setAdmin(response.data.admin);
      if (response.data.admin) {
        dispatch(createToken(response.data.token));
        navigate("/admin");
      } else {
        setMsg(response.data.message);
      }
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <>
      <Container className="body">
        <Row className="d-flex flex-column align-items-center">
          <Col md={4}>
            <h2 className="text-center my-3">Ingresar como administrador</h2>
            <Form
              onSubmit={(event) => {
                event.preventDefault();
                if (email !== "" && password !== "") addToken();
              }}
            >
              <Form.Group className="mb-3" controlId="email">
                <Form.Label>Correo</Form.Label>
                <Form.Control
                  type="email"
                  placeholder="admin@admin.uy"
                  onChange={(e) => setEmail(e.target.value)}
                />
              </Form.Group>

              <Form.Group className="mb-3" controlId="password">
                <Form.Label>Contraseña</Form.Label>
                <Form.Control
                  type="password"
                  placeholder="123"
                  onChange={(e) => setPassword(e.target.value)}
                />
              </Form.Group>

              <Form.Group className="mb-3" controlId="checkbox">
                <Form.Check type="checkbox" label="Mantenerme conectado" />
              </Form.Group>

              {!admin && (
                <div className="mb-2">
                  <span className="invalidUser p-2">
                    Correo o contraseña incorrecto
                  </span>
                </div>
              )}

              <button
                type="submit"
                className="ingresarBtn loginBtns py-1 my-2 w-100"
              >
                Ingresar
              </button>

              <Link onClick={notify}>Olvidé mi contraseña</Link>
            </Form>
          </Col>
          <Col md={4} className="mt-5">
            <p>
              <b>Usuario de prueba</b>
            </p>
            <p>
              Para simplificar el acceso a la aplicación, se proporciona el
              siguiente usuario de administrador de prueba:
            </p>
            <ul>
              <li>E-mail: admin@admin.uy</li>
              <li>Contraseña: 123</li>
            </ul>
          </Col>
        </Row>
      </Container>
      <ToastContainer position="top-right" autoClose={3000} />
    </>
  );
}
