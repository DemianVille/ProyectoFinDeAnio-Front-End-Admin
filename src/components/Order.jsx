import React from "react";
import { useState, useEffect } from "react";
import { Row, Col } from "react-bootstrap";
import { useSelector, useDispatch } from "react-redux";
export default function user({ id }) {
  const [order, setOrder] = useState({});
  const token = useSelector((state) => state.token);

  useEffect(() => {
    const getOrder = async () => {
      try {
        const options = {
          method: "GET",
          headers: {
            accept: "application/json",
            Authorization: `Bearer ${token}`,
          },
        };
        const response = await fetch(
          `http://localhost:3000/orders/${id}`,
          options
        );
        const orderObjet = await response.json();
        setOrder(orderObjet);
      } catch (err) {
        console.error(err);
      }
    };
    getOrder();
  }, []);

  return (
    <>
      <Row className="usersRow">
        <hr />
        <Col xs={2}>{order.id}</Col>
        <Col xs={4}>{`${user.firstname} ${user.lastname}`}</Col>
        <Col xs={4}>{order.status}</Col>
        <Col xs={2} className="d-flex">
          <button className="botonEdit">Editar</button>
        </Col>
      </Row>
    </>
  );
}
