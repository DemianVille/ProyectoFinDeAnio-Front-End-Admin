import React from "react";
import axios from "axios";
import { useState, useEffect } from "react";
import { Container, Row, Col, Modal, Button, Form } from "react-bootstrap";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import Category from "../components/Category";
import SideBar from "../components/SideBar";
import NavBar from "../components/NavBar";
const url = import.meta.env.VITE_URL;

export default function Categories() {
  const [categories, setCategories] = useState([]);
  const [show, setShow] = useState(false);
  const [name, setName] = useState("");
  const token = useSelector((state) => state.token);
  const navigate = useNavigate();

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const addCategory = async () => {
    try {
      const options = {
        method: "POST",
        headers: {
          accept: "application/json",
          Authorization: `Bearer ${token}`,
        },
        data: {
          name,
        },
      };

      const response = await axios(`${url}categories`, options);
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
    const getCategories = async () => {
      try {
        const options = {
          method: "GET",
          headers: {
            accept: "application/json",
            Authorization: `Bearer ${token}`,
          },
        };
        const response = await fetch(
          `${url}categories`,
          options
        );
        const allCategoriesObject = await response.json();
        setCategories(allCategoriesObject);
      } catch (err) {
        console.error(err);
      }
    };
    getCategories();
  }, [categories]);

  return (
    <>
      <Row className="w-100">
        <Col xs={3} lg={2}>
          <SideBar />
        </Col>
        <Col xs={9} lg={10}>
          <NavBar />
          <Container fluid>
            <div className="d-flex justify-content-between my-5">
              <h3>Categorías</h3>
              <button className="botonAgregar px-3" onClick={handleShow}>
                Agregar Categoría
              </button>
            </div>
            <div className="tables">
              <Row className="infoRow">
                <div>Nombre</div>
              </Row>
              {categories.length === 0 ? (
                <Row className="">
                  <hr />
                  <p>Lista vacía</p>
                </Row>
              ) : (
                categories.map((category) => {
                  return (
                    <Row className="productRow d-flex">
                      <Category key={category.id} id={category.id} />
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
              <h2>Agregar Categoría</h2>
            </div>
            <Form.Group className="mb-2">
              <Form.Label htmlFor="name">Nombre</Form.Label>
              <Form.Control
                id="name"
                type="text"
                aria-label="First name"
                value={name}
                onChange={(e) => setName(e.target.value)}
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
              <i className="bi bi-caret-left"></i> Volver a categorías
            </button>
            <div>
              <button
                className="confirmEdit mx-1"
                onClick={() => {
                  handleClose();
                  addCategory();
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
