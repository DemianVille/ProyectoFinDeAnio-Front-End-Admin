import React from "react";
import { useState, useEffect } from "react";
import { Row, Col } from "react-bootstrap";
import { Link } from "react-router-dom";

export default function Product({ id }) {
  const [product, setProduct] = useState({});

  useEffect(() => {
    const getProduct = async () => {
      try {
        const options = {
          method: "GET",
          headers: {
            accept: "application/json",
          },
        };
        const response = await fetch(
          `http://localhost:3000/products/${id}`,
          options
        );
        const productsObject = await response.json();
        setProduct(productsObject);
      } catch (err) {
        console.error(err);
      }
    };
    getProduct();
  }, []);

  return (
    <>
      <Row className="productRow">
        <hr />
        <Col xs={6}>{product.name}</Col>
        <Col xs={2}>{product.price}</Col>
        <Col xs={2}>{product.stock}</Col>
        <Col xs={2} className="d-flex">
          <Link to={`/admin/productos/${product.id}`}>
            <button className="botonEdit">Editar</button>
          </Link>
        </Col>
      </Row>
    </>
  );
}
