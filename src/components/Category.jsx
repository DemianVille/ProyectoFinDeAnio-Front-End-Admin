import React from "react";
import axios from "axios";
import { useState, useEffect } from "react";
import { Row, Col, Button, Modal, Form } from "react-bootstrap";
import { Link } from "react-router-dom";
import { useNavigate, useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";

export default function Category({ id }) {
  const token = useSelector((state) => state.token);

  const [category, setCategory] = useState({});
  const [show, setShow] = useState(false);
  const [name, setName] = useState("");
  const [deleteItem, setDeleteItem] = useState(null);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const editCategory = async () => {
    try {
      const options = {
        method: "PATCH",
        headers: {
          accept: "application/json",
          Authorization: `Bearer ${token}`,
        },
        data: {
          name,
        },
      };

      const response = await axios(
        `http://localhost:3000/categories/${id}`,
        options
      );
    } catch (err) {
      console.error(err);
    }
  };
  const deleteCategory = async () => {
    try {
      const options = {
        method: "DELETE",
        headers: {
          accept: "application/json",
          Authorization: `Bearer ${token}`,
        },
      };

      const response = await axios(
        `http://localhost:3000/categories/${id}`,
        options
      );
      setDeleteItem(response.data.message);
    } catch (err) {
      handleClose();
    }
  };

  useEffect(() => {
    const getCategory = async () => {
      try {
        const options = {
          method: "GET",
          headers: {
            accept: "application/json",
          },
        };
        const response = await fetch(
          `http://localhost:3000/categories/${id}`,
          options
        );
        const categoryObject = await response.json();
        setCategory(categoryObject);
      } catch (err) {
        console.error(err);
      }
    };
    getCategory();
  }, [show, deleteItem]);

  return (
    <>
      <hr />
      <Col xs={8}>{category.name}</Col>
      <Col xs={4} className="d-flex align-items-center">
        <button className="botonEdit" onClick={handleShow}>
          Editar <i class="bi bi-pen"></i>
        </button>
      </Col>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>
            <div className="d-flex align-items-center">
              <p className="my-0 mx-3">{category.name}</p>
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
              <h2>Editar categoría</h2>
            </div>
            <Form.Group className="mb-2">
              <Form.Label htmlFor="name">Nombre</Form.Label>
              <Form.Control
                id="name"
                type="text"
                aria-label="First name"
                placeholder={category.name}
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
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
              <i className="bi bi-caret-left"></i> Volver a categorías
            </button>
            <div>
              <button className="deleteBtn" onClick={deleteCategory}>
                Eliminar
              </button>
              <button
                className="confirmEdit mx-1"
                onClick={() => {
                  handleClose();
                  editCategory();
                }}
              >
                Editar
              </button>
            </div>
          </div>
        </Modal.Footer>
      </Modal>
    </>
  );
}
