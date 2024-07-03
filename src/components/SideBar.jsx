import React from "react";
import { Row, Col, Image } from "react-bootstrap";

export default function SideBar() {
  return (
    <>
      <Row>
        <Col xs={3}>
          <div>
            <Image className="" src="/src/assets/Logo.png"></Image>
            <span className="fontPlaywrite">Copéllia</span>
          </div>
        </Col>
      </Row>
    </>
  );
}
