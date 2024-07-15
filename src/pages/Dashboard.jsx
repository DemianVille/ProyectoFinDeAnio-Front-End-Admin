import React, { useState, useEffect } from "react";
import { Container, Row, Col } from "react-bootstrap";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import SideBar from "../components/SideBar";
import NavBar from "../components/NavBar";
import Order from "../components/Order";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const url = import.meta.env.VITE_URL;

export default function Dashboard() {
  const [orders, setOrders] = useState([]);
  const [lastOrders, setLastOrders] = useState([]);
  const [users, setUsers] = useState([]);
  const token = useSelector((state) => state.token);
  const navigate = useNavigate();

  useEffect(() => {
    if (!token) {
      navigate("/admin/login");
    }
  }, [token, navigate]);

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
        setLastOrders(ordersList.slice(-10));
      } catch (err) {
        console.error(err);
      }
    };
    getOrders();
  }, [token, orders]);

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
        const response = await fetch(`${url}users`, options);
        const usersList = await response.json();
        setUsers(usersList);
      } catch (err) {
        console.error(err);
      }
    };
    getUsers();
  }, [token, users]);

  const aggregateUsersByDate = users.reduce((acc, user) => {
    const date = new Date(user.createdAt).toLocaleDateString();
    if (!acc[date]) {
      acc[date] = 0;
    }
    acc[date] += 1;
    return acc;
  }, {});

  const aggregateOrdersByDate = orders.reduce((acc, order) => {
    const date = new Date(order.updatedAt).toLocaleDateString();
    if (!acc[date]) {
      acc[date] = 0;
    }
    const totalPrice = order.products
      ? order.products.reduce(
          (acum, product) => acum + product.price * product.qty,
          0
        )
      : 0;
    acc[date] += totalPrice;
    return acc;
  }, {});

  const usersChartData = {
    labels: Object.keys(aggregateUsersByDate),
    datasets: [
      {
        label: "Usuarios registrados",
        data: Object.values(aggregateUsersByDate),
        backgroundColor: "rgba(97, 238, 191, 0.268)",
        borderColor: "rgb(97, 238, 191)",
        borderWidth: 1,
      },
    ],
  };

  const ordersChartData = {
    labels: Object.keys(aggregateOrdersByDate),
    datasets: [
      {
        label: "Precio total",
        data: Object.values(aggregateOrdersByDate),
        backgroundColor: "rgba(97, 238, 191, 0.268)",
        borderColor: "rgb(97, 238, 191)",
        borderWidth: 1,
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: "top",
      },
      title: {
        display: true,
        text: "Precio total de las órdenes por día",
      },
    },
  };

  const usersChartOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: "top",
      },
      title: {
        display: true,
        text: "Usuarios registrados por día",
      },
    },
  };

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
              <h3>Últimas 10 ordenes</h3>
            </div>
            <Container className="mb-5">
              <Row className="chartRow">
                <Col xs={12} md={6}>
                  <Bar data={ordersChartData} options={chartOptions} />
                </Col>
                <Col xs={12} md={6}>
                  <Bar data={usersChartData} options={usersChartOptions} />
                </Col>
              </Row>
            </Container>
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
                lastOrders.map((order) => {
                  return (
                    <Row className="productRow d-flex" key={order.id}>
                      <Order id={order.id} />
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
