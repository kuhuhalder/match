import React from "react";
import { Button, Col, Container, Row } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import "./css/Home.css";
import banner from "./images/banner.jpeg";
const Home = (props) => {
  const navigate = useNavigate();
  return (
    <Container>
      <div>
        <img class="banner" src={banner} alt="homeImage" />
      </div>
      <Row>
        <Button
          variant="primary"
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
            Register
          </Button>

          <Button
            variant="primary"
            type="submit"
            onClick={() => {
              navigate("/login");
            }}
          >
            Login
          </Button>
        </Col>

        <Col>
          <h2>Admins</h2>
          <Button
            variant="primary"
            type="submit"
            onClick={() => {
              navigate("/registeradmin");
            }}
          >
            Register
          </Button>

          <Button
            variant="primary"
            type="submit"
            onClick={() => {
              navigate("/loginadmin");
            }}
          >
            Login
          </Button>
        </Col>
      </Row>
    </Container>
  );
};
export default Home;
