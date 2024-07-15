import React from "react";
import axios from "axios";
import { useState, useEffect } from "react";
import { Row, Col, Button, Modal, Form } from "react-bootstrap";
import { Link } from "react-router-dom";
import { useNavigate, useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
const url = import.meta.env.VITE_URL;

export default function Product({ id }) {
  const token = useSelector((state) => state.token);

  const [product, setProduct] = useState({});
  const [show, setShow] = useState(false);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [colors, setColors] = useState("");
  const [photo, setPhoto] = useState("");
  const [price, setPrice] = useState("");
  const [stock, setStock] = useState("");
  const [deleteItem, setDeleteItem] = useState(null);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const editProduct = async () => {
    try {
      const options = {
        method: "PATCH",
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
        },
      };

      const response = await axios(`${url}products/${id}`, options);
    } catch (err) {
      console.error(err);
    }
  };
  const deleteProduct = async () => {
    try {
      const options = {
        method: "DELETE",
        headers: {
          accept: "application/json",
          Authorization: `Bearer ${token}`,
        },
      };

      const response = await axios(`${url}products/${id}`, options);
      setDeleteItem(response.data.message);
    } catch (err) {
      handleClose();
    }
  };

  useEffect(() => {
    const getProduct = async () => {
      try {
        const options = {
          method: "GET",
          headers: {
            accept: "application/json",
          },
        };
        const response = await fetch(`${url}products/${id}`, options);
        const productsObject = await response.json();
        setProduct(productsObject);
      } catch (err) {
        console.error(err);
      }
    };
    getProduct();
  }, [show, deleteItem, product.stok]);

  return (
    <>
      <hr />
      <Col xs={6}>{product.name}</Col>
      <Col xs={2}>${product.price}.00</Col>
      <Col xs={2}>{product.stock}</Col>
      <Col xs={2} className="d-flex align-items-center">
        <button className="botonEdit" onClick={handleShow}>
          Editar <i class="bi bi-pen"></i>
        </button>
      </Col>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>
            <div className="d-flex align-items-center">
              <div className="photoDiv">
                <img src={product.photo} className="w-100" />
              </div>
              <p className="my-0 mx-3">{product.name}</p>
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
              <h2>Editar producto</h2>
            </div>
            <Form.Group className="mb-2">
              <Form.Label htmlFor="name">Nombre</Form.Label>
              <Form.Control
                id="name"
                type="text"
                aria-label="First name"
                placeholder={product.name}
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
                placeholder={product.description}
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
                placeholder={`$${product.price}.00`}
                value={price}
                onChange={(e) => setPrice(e.target.value)}
              />
            </Form.Group>
            <Form.Group className="mb-2">
              <Form.Label htmlFor="password">Stock</Form.Label>
              <Form.Control
                id="password"
                type="number"
                placeholder={product.stock}
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
            <button
              className="returnToDashboard"
              onClick={() => {
                handleClose();
              }}
            >
              <i className="bi bi-caret-left"></i> Volver a productos
            </button>
            <div>
              <button className="deleteBtn" onClick={deleteProduct}>
                Eliminar
              </button>
              <button
                className="confirmEdit mx-1"
                onClick={() => {
                  handleClose();
                  editProduct();
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
