import React from "react";
import { useState, useEffect } from "react";
import { Container, Row, Col } from "react-bootstrap";
import { useSelector, useDispatch } from "react-redux";
import Product from "../components/Product";
import SideBar from "../components/SideBar";

export default function Products() {
  const [products, setProducts] = useState([]);
  const token = useSelector((state) => state.token.token);
  useEffect(() => {
    const getProducts = async () => {
      try {
        const options = {
          method: "GET",
          headers: {
            accept: "application/json",
            Authorization: { token },
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
      <Row>
        <Col xs={3}>
          <SideBar />
        </Col>
        <Col xs={9}>
          <Container fluid>
            <div className="d-flex justify-content-between my-5">
              <h3>Productos</h3>
              <button className="botonAgregar">Agregar producto</button>
            </div>
            <div className="productsTable">
              <Row className="infoRow">
                <Col xs={6}>Nombre</Col>
                <Col xs={2}>Precio</Col>
                <Col xs={2}>Stock</Col>
                <Col xs={2}></Col>
              </Row>
              {products.map((product) => {
                return <Product key={product.id} id={product.id} />;
              })}
            </div>
          </Container>
        </Col>
      </Row>
    </>
  );
}
