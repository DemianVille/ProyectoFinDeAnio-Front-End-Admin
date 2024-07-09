import React from "react";
import axios from "axios";
import { useState, useEffect } from "react";
import { Container, Row, Col, Modal, Button, Form } from "react-bootstrap";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import Product from "../components/Product";
import SideBar from "../components/SideBar";

export default function Products() {
  const [products, setProducts] = useState([]);
  const [show, setShow] = useState(false);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [colors, setColors] = useState("");
  const [photo, setPhoto] = useState("");
  const [price, setPrice] = useState("");
  const [stock, setStock] = useState("");
  const [featured, setFeatured] = useState(false);
  const token = useSelector((state) => state.token);
  const navigate = useNavigate();

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const addProduct = async () => {
    try {
      const options = {
        method: "POST",
        headers: {
          accept: "application/json",
          Authorization: `Bearer ${token}`,
        },
        data: {
          name,
          description,
          colors,
          photo,
          price,
          stock,
          featured,
        },
      };

      const response = await axios(`http://localhost:3000/products`, options);
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
    const getProducts = async () => {
      try {
        const options = {
          method: "GET",
          headers: {
            accept: "application/json",
            Authorization: `Bearer ${token}`,
          },
        };
        const response = await fetch(`http://localhost:3000/products`, options);
        const allProductsObject = await response.json();
        setProducts(allProductsObject);
      } catch (err) {
        console.error(err);
      }
    };
    getProducts();
  }, [products]);

  return (
    <>
      <Row className="w-100">
        <Col xs={3} lg={2}>
          <SideBar />
        </Col>
        <Col xs={9} lg={10}>
          <Container fluid>
            <div className="d-flex justify-content-between my-5">
              <h3>Productos</h3>
              <button className="botonAgregar px-3" onClick={handleShow}>
                Agregar producto
              </button>
            </div>
            <div className="tables">
              <Row className="infoRow">
                <Col xs={6}>Nombre</Col>
                <Col xs={2}>Precio</Col>
                <Col xs={2}>Stock</Col>
              </Row>
              {products.length === 0 ? (
                <Row className="">
                  <hr />
                  <p>Lista vacía</p>
                </Row>
              ) : (
                products.map((product) => {
                  return (
                    <Row className="productRow d-flex">
                      <Product key={product.id} id={product.id} />
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
              <h2>Agregar producto</h2>
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
            <Form.Group className="mb-2">
              <Form.Label htmlFor="lastname">Descripción</Form.Label>
              <Form.Control
                id="lastname"
                as="textarea"
                rows={4}
                aria-label="Last name"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />
            </Form.Group>
            <Form.Group className="mb-2">
              <Form.Label htmlFor="email">Colores</Form.Label>
              <Form.Control
                id="email"
                type="email"
                aria-describedby="email"
                placeholder="red, blue, etc"
                value={colors}
                onChange={(e) => setColors(e.target.value)}
              />
            </Form.Group>
            <Form.Group className="mb-2">
              <Form.Label htmlFor="address">Foto</Form.Label>
              <Form.Control
                id="address"
                type="text"
                aria-describedby="address"
                placeholder="url"
                value={photo}
                onChange={(e) => setPhoto(e.target.value)}
              />
            </Form.Group>
            <Form.Group className="mb-2">
              <Form.Label htmlFor="phone">Precio</Form.Label>
              <Form.Control
                id="phone"
                type="number"
                aria-describedby="phone"
                placeholder={`$0.00`}
                value={price}
                onChange={(e) => setPrice(e.target.value)}
              />
            </Form.Group>
            <Form.Group className="mb-2">
              <Form.Label htmlFor="password">Stock</Form.Label>
              <Form.Control
                id="password"
                type="number"
                placeholder="0"
                value={stock}
                onChange={(e) => setStock(e.target.value)}
              />
            </Form.Group>
            <Form.Group className="mb-2">
              <Form.Check
                type="checkbox"
                id="politicsCheckbox"
                label="Destacado"
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <div className="editBtn w-100 mb-3">
            <Link to={"/admin/productos"}>
              <button
                className="returnToDashboard"
                onClick={() => {
                  handleClose();
                }}
              >
                <i className="bi bi-caret-left"></i> Volver a productos
              </button>
            </Link>
            <div>
              <button
                className="confirmEdit mx-1"
                onClick={() => {
                  handleClose();
                  addProduct();
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
