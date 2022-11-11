import React from "react";
import { Button } from "react-bootstrap";
import { Container, Col, Row } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import homeImage from "./images/Home.png";
import "./Home.css";
const Home = (props) => {
  const navigate = useNavigate();
  return (
    <>
      {/* <div>
      <img src={homeImage} alt="homeImage"/>;
    </div> */}
      {/* <h2>Home Page</h2> */}
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
    </>
  );
};
export default Home;
