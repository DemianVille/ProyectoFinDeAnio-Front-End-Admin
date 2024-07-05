import React from "react";
import { useState, useEffect } from "react";
import { Container, Row, Col } from "react-bootstrap";
import { useSelector, useDispatch } from "react-redux";
import User from "../components/User";
import SideBar from "../components/SideBar";

export default function Users() {
  const [users, setUsers] = useState([]);
  const token = useSelector((state) => state.token);
  useEffect(() => {
    const getUsers = async () => {
      try {
        const options = {
          method: "GET",
          headers: {
            accept: "application/json",
            Authorization: `Bearer ${token}`,
          },
        };
        const response = await fetch(`http://localhost:3000/users`, options);
        const userList = await response.json();
        setUsers(userList);
      } catch (err) {
        console.error(err);
      }
    };
    getUsers();
  }, []);

  return (
    <>
      <Row className="w-100">
        <Col xs={3} lg={2}>
          <SideBar />
        </Col>
        <Col xs={9} lg={10}>
          <Container fluid className="mb-5">
            <div className="d-flex justify-content-between my-5">
              <h3>Usuarios</h3>
              <button className="botonAgregar px-3">Agregar usuario</button>
            </div>
            <div className="tables">
              <Row className="infoRow">
                <Col xs={2}>Id</Col>
                <Col xs={4}>Nombre completo</Col>
                <Col xs={4}>Email</Col>
              </Row>
              {users.length === 0 ? (
                <Row className="">
                  <hr />
                  <p>Lista vacía</p>
                </Row>
              ) : (
                users.map((user) => {
                  return <User key={user.id} id={user.id} />;
                })
              )}
            </div>
          </Container>
        </Col>
      </Row>
    </>
  );
}
