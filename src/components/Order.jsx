import React from "react";
import axios from "axios";
import { useState, useEffect } from "react";
import { Row, Col, Modal, Form } from "react-bootstrap";
import { useSelector, useDispatch } from "react-redux";
export default function Order({ id }) {
  const [order, setOrder] = useState({});
  const [show, setShow] = useState(false);
  const [status, setStatus] = useState("");
  const [deleteItem, setDeleteItem] = useState(null);
  const token = useSelector((state) => state.token);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const editOrder = async () => {
    try {
      const options = {
        method: "PATCH",
        headers: {
          accept: "application/json",
          Authorization: `Bearer ${token}`,
        },
        data: {
          status,
        },
      };

      const response = await axios(
        `http://localhost:3000/orders/${id}`,
        options
      );
    } catch (err) {
      console.error(err);
    }
  };
  const deleteOrder = async () => {
    try {
      const options = {
        method: "DELETE",
        headers: {
          accept: "application/json",
          Authorization: `Bearer ${token}`,
        },
      };

      const response = await axios(
        `http://localhost:3000/orders/${id}`,
        options
      );
      setDeleteItem(response.data.message);
    } catch (err) {
      handleClose();
    }
  };

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
  }, [show, deleteItem]);

  const initialValue = 0;
  const totalPrice = order.products
    ? order.products.reduce(
        (acumulator, currentValue) =>
          acumulator + currentValue.price * currentValue.qty,
        initialValue
      )
    : 0;

  return (
    order.user && (
      <>
        <hr />
        <Col xs={2}>{order.id}</Col>
        <Col xs={4}>{`${order.user.firstname} ${order.user.lastname}`}</Col>
        <Col xs={2} className="d-flex">
          ${totalPrice}.00
        </Col>
        <Col xs={3}>{order.status}</Col>
        <Col xs={1} className="d-flex align-items-center">
          <button className="botonEdit" onClick={handleShow}>
            Editar <i class="bi bi-pen"></i>
          </button>
        </Col>
        <Modal show={show} onHide={handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>
              <div className="d-flex align-items-center">
                <p className="my-0 mx-3">{`Orden hecha por: ${order.user.firstname} ${order.user.lastname}`}</p>
              </div>
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form
              onSubmit={(event) => {
                event.preventDefault();
              }}
            >
              <div className="text-center mb-3 mt-3">
                <h2>Editar órden</h2>
              </div>
              <Form.Group className="mb-2">
                <Form.Label htmlFor="name">Estado</Form.Label>
                <Form.Select onChange={(e) => setStatus(e.target.value)}>
                  <option>Elige una opción</option>
                  <option value="pending">Pendiente</option>
                  <option value="rejected">Rechazado</option>
                  <option value="processing">Procesando</option>
                  <option value="shipped">En envío</option>
                  <option value="delivered">Entregado</option>
                </Form.Select>
              </Form.Group>
            </Form>
          </Modal.Body>
          <Modal.Footer>
            <div className="editBtn w-100 mb-3">
              <button
                className="returnToDashboard"
                onClick={() => {
                  handleClose();
                }}
              >
                <i className="bi bi-caret-left"></i> Volver a usuarios
              </button>
              <div>
                <button
                  className="deleteBtn"
                  onClick={() => {
                    handleClose();
                    deleteOrder();
                  }}
                >
                  Eliminar
                </button>
                <button
                  className="confirmEdit mx-1"
                  onClick={() => {
                    handleClose();
                    editOrder();
                  }}
                >
                  Editar
                </button>
              </div>
            </div>
          </Modal.Footer>
        </Modal>
      </>
    )
  );
}
