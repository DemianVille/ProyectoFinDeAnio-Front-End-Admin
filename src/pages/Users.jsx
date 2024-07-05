import React from "react";
import { useState, useEffect } from "react";
import { Container, Row, Col } from "react-bootstrap";
import { useSelector, useDispatch } from "react-redux";
import SideBar from "../components/SideBar";

export default function Users() {
  const token = useSelector((state) => state.token);
  return (
    <>
      <Row>
        <Col xs={3}>
          <SideBar />
        </Col>
        <Col xs={9}>
          <Container fluid>
            <div className="d-flex justify-content-between my-5">
              <h3>Usuarios</h3>
              <button className="botonAgregar">Agragar Usuario</button>
            </div>
            <div className="productsTable">
              <Row className="infoRow">
                <Col xs={6}>Nombre</Col>
                <Col xs={2}>Precio</Col>
                <Col xs={2}>Stock</Col>
                <Col xs={2}></Col>
              </Row>
              {/* {products.map((product) => {
                return <div></div>;
              })} */}
            </div>
          </Container>
        </Col>
      </Row>
    </>
  );
}
