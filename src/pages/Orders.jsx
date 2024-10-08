import React from "react";
import { useState, useEffect } from "react";
import { Container, Row, Col } from "react-bootstrap";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import SideBar from "../components/SideBar";
import NavBar from "../components/NavBar";
import Order from "../components/Order";
const url = import.meta.env.VITE_URL;

export default function Orders() {
  const [orders, setOrders] = useState([]);
  const token = useSelector((state) => state.token);
  const navigate = useNavigate();

  useEffect(() => {
    if (!token) {
      navigate("/admin/login");
    }
  }, []);

  useEffect(() => {
    const getOrders = async () => {
      try {
        const options = {
          method: "GET",
          headers: {
            accept: "application/json",
            Authorization: `Bearer ${token}`,
          },
        };
        const response = await fetch(`${url}orders`, options);
        const ordersList = await response.json();
        setOrders(ordersList);
      } catch (err) {
        console.error(err);
      }
    };
    getOrders();
  }, [orders]);
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
              <h3>Órdenes</h3>
            </div>
            <div className="tables">
              <Row className="infoRow">
                <Col xs={2}>Id</Col>
                <Col xs={4}>Usuario</Col>
                <Col xs={2}>Precio total</Col>
                <Col xs={4}>Estado</Col>
              </Row>
              {orders.length === 0 ? (
                <Row className="">
                  <hr />
                  <p>Lista vacía</p>
                </Row>
              ) : (
                orders.map((order) => {
                  return (
                    <Row className="productRow d-flex">
                      <Order key={order.id} id={order.id} />
                    </Row>
                  );
                })
              )}
            </div>
          </Container>
        </Col>
      </Row>
    </>
  );
}
