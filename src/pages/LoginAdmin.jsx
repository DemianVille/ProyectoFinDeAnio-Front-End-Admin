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
      if (response.data.admin) {
        dispatch(createToken(response.data));
        navigate("/admin");
      } else {
        setMsg(response.data.message);
      }
    } catch (err) {
      console.error(err);
    }
  };
  console.log(token);

  return (
    <>
      <Container className="body">
        <Row className="d-flex justify-content-center">
          <Col md={4}>
            <h2 className="text-center my-3">Ingresar</h2>
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
                  placeholder="ejemplo@gmail.com"
                  onChange={(e) => setEmail(e.target.value)}
                />
              </Form.Group>

              <Form.Group className="mb-3" controlId="password">
                <Form.Label>Contraseña</Form.Label>
                <Form.Control
                  type="password"
                  placeholder="1234abcd"
                  onChange={(e) => setPassword(e.target.value)}
                />
              </Form.Group>

              <Form.Group className="mb-3" controlId="checkbox">
                <Form.Check type="checkbox" label="Mantenerme conectado" />
              </Form.Group>

              {msg === "This user doesn't exist." && (
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

              <Link to={"/ingresar"} onClick={notify}>
                Olvidé mi contraseña
              </Link>
            </Form>
          </Col>
        </Row>
      </Container>
      <ToastContainer position="top-right" autoClose={3000} />
    </>
  );
}