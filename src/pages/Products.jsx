
import React from "react";
import { useState, useEffect } from "react";
import { Container, Row, Col } from "react-bootstrap";
import Product from "../components/Product";

export default function Products() {
  const [products, setProducts] = useState([]);
  useEffect(() => {
    const getProducts = async () => {
      try {
        const options = {
          method: "GET",
          headers: {
            accept: "application/json",
            /*      Authorization:
              "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJhOGEzZDhjOGZlMjRlNzlkMmJjN2IyZjYyMmRlMDU2MyIsInN1YiI6IjY2NDUzYmFhYTE3ZjJiYzVkNjJkNzc1YyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.C6hY6n2PKJhRMxLnv2n0Fp57fvRLTtX3bsEW_ipnANE", */
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
  }, []);

  return (
    <>
      <Container fluid>
        <div className="d-flex justify-content-between my-5">
          <h3>Productos</h3>
          <button>Agragar producto</button>
        </div>
        <div className="productsTable">
          <Row className="infoRow">
            <Col xs={6}>Nombre</Col>
            <Col xs={2}>Precio</Col>
            <Col xs={2}>Stock</Col>
            <Col xs={2}></Col>
          </Row>
          {products.map((product) => {
            return <Product id={product.id} />;
          })}
        </div>
      </Container>
    </>
  );
}