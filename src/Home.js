import React, { useState } from "react";
import { Button, Col, Container, Row } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import "./css/Home.css";
import banner from "./images/banner.jpeg";
/**
 * Home component to display the home page.
 * @param {*} props
 * @returns React component
 */
const Home = (props) => {
  const navigate = useNavigate();
  return (
    <Container>
      <div>
        <img className="banner" src={banner} alt="homeImage" />
      </div>
      <Row>
        <Button
          variant="custom"
          type="submit"
          onClick={() => {
            navigate("/home");
          }}
        >
          Learn about us
        </Button>
      </Row>
      <Row>
        <Col>
          <h2>Students</h2>
          <Button
            variant="primary"
            type="submit"
            onClick={() => {
              navigate("/register");
            }}
          >
            Student Register
          </Button>

          <Button
            variant="primary"
            type="submit"
            onClick={() => {
              navigate("/login");
            }}
          >
            Student Login
          </Button>
        </Col>

        <Col>
          <h2>Admins</h2>
          <Button
            variant="primary"
            type="submit"
            onClick={() => {
              navigate("/registerverify");
            }}
          >
            Admin Register
          </Button>

          <Button
            variant="primary"
            type="submit"
            onClick={() => {
              navigate("/loginverify");
            }}
          >
            Admin Login
          </Button>
        </Col>
      </Row>
    </Container>
  );
};
export default Home;
