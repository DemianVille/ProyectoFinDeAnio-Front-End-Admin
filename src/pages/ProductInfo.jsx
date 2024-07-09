import React from "react";
import axios from "axios";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import { Container, Row, Col, Form } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";

export default function ProductInfo() {
  const params = useParams();
  const token = useSelector((state) => state.token);
  const navigate = useNavigate();

  useEffect(() => {
    if (!token) {
      navigate("/admin/login");
    }
  }, []);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [colors, setColors] = useState("");
  const [photo, setPhoto] = useState("");
  const [price, setPrice] = useState("");
  const [stock, setStock] = useState("");
  const [product, setProduct] = useState([]);

  useEffect(() => {
    const getProduct = async () => {
      try {
        const options = {
          method: "GET",
          headers: {
            accept: "application/json",
            Authorization: `Bearer ${token}`,
          },
        };
        const response = await fetch(
          `http://localhost:3000/products/${params.id}`,
          options
        );
        const productObject = await response.json();
        setProduct(productObject);
      } catch (err) {
        console.error(err);
      }
    };
    getProduct();
  }, []);

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

      const response = await axios(
        `http://localhost:3000/products/${params.id}`,
        options
      );
      if (response.data.message === "Product modified.") {
        navigate("/admin/productos");
      }
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <>
      <Container className="body">
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
        <div className="editBtn mb-3">
          <Link to={"/admin/productos"}>
            <button className="returnToDashboard">
              <i className="bi bi-caret-left"></i> Volver a productos
            </button>
          </Link>
          <button
            className="confirmEdit"
            onClick={() => {
              editProduct();
            }}
          >
            Editar
          </button>
        </div>
      </Container>
    </>
  );
}
