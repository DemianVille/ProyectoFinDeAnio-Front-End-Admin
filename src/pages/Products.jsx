import React from "react";
import { useState, useEffect } from "react";
import { Container, Row, Col } from "react-bootstrap";
import { useSelector, useDispatch } from "react-redux";
import Product from "../components/Product";
import SideBar from "../components/SideBar";

export default function Products() {
  const [products, setProducts] = useState([]);
  const token = useSelector((state) => state.token);
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
  }, []);

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
              <button className="botonAgregar px-3">Agregar producto</button>
            </div>
            <div className="tables">
              <Row className="infoRow">
                <Col xs={6}>Nombre</Col>
                <Col xs={2}>Precio</Col>
                <Col xs={2}>Stock</Col>
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
