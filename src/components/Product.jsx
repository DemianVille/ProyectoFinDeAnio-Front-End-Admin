import React from "react";
import { useState, useEffect } from "react";
import { Row, Col } from "react-bootstrap";

export default function Product({ id }) {
  const [product, setProduct] = useState();
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
        const product = await response.json();
        setProduct(product);
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
        <Col xs={2}>
          <button>Editar</button>
        </Col>
      </Row>
    </>
  );
}
