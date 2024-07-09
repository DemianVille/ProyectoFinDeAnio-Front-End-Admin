import React from "react";
import { useState, useEffect } from "react";
import { Row, Col } from "react-bootstrap";
import { useSelector, useDispatch } from "react-redux";
export default function user({ id }) {
  const [user, setUser] = useState({});
  const token = useSelector((state) => state.token);

  useEffect(() => {
    const getUser = async () => {
      try {
        const options = {
          method: "GET",
          headers: {
            accept: "application/json",
            Authorization: `Bearer ${token}`,
          },
        };
        const response = await fetch(
          `http://localhost:3000/users/${id}`,
          options
        );
        const userObjet = await response.json();
        setUser(userObjet);
      } catch (err) {
        console.error(err);
      }
    };
    getUser();
  }, []);

  return (
    <>
      <Row className="usersRow">
        <hr />
        <Col xs={2}>{user.id}</Col>
        <Col xs={4}>{`${user.firstname} ${user.lastname}`}</Col>
        <Col xs={4}>{user.email}</Col>
        <Col xs={2} className="d-flex">
        
          <button className="botonEdit">Editar</button>
        </Col>
      </Row>
    </>
  );
}
