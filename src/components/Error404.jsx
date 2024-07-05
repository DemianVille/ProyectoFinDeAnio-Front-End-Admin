import React from "react";
import { Container, Row, Col, Image } from "react-bootstrap";
import { Link } from "react-router-dom";

export default function Error404() {
  return (
    <>
      <Container className="body">
        <Row>
          <Col className="col-12 text-center">
            <div className="fs-1">
              <p>
                <b>Error 404</b>
              </p>
              <p>Esta página no existe</p>
            </div>
            <Image src="/src/assets/Ballerina.png" />
            <br />
            <Link to={"/admin"}>
              <button className="backToHomePage p-2 my-2">
                Volver a la página principal
              </button>
            </Link>
          </Col>
        </Row>
      </Container>
    </>
  );
}
