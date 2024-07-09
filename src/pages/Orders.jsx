import React from "react";
import { useState, useEffect } from "react";
import { Container, Row, Col } from "react-bootstrap";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import SideBar from "../components/SideBar";
import User from "../components/User";

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
        const response = await fetch(`http://localhost:3000/orders`, options);
        const ordersList = await response.json();
        setOrders(ordersList);
      } catch (err) {
        console.error(err);
      }
    };
    getOrders();
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
              <h3>Dashboard</h3>
            </div>
            <div className="tables">
              <Row className="infoRow">
                <Col xs={2}>Id</Col>
                <Col xs={4}>Usuario</Col>
                <Col xs={3}>Precio total</Col>
                <Col xs={3}>Estado</Col>
              </Row>
              {orders.length === 0 ? (
                <Row className="">
                  <hr />
                  <p>Lista vacía</p>
                </Row>
              ) : (
                orders.map((order) => {
                  return <User key={order.id} id={order.id} />;
                })
              )}
            </div>
          </Container>
        </Col>
      </Row>
    </>
  );
}
