import React from "react";
import { Col, Container, Row } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import "./css/Home.css";
import homeImage from "./images/Home.png";
const AboutUs = () => {
  const navigate = useNavigate();
  return (
    <Container>
      <Row></Row>
      <Row>
        <Col className="text-center">
          <img src={homeImage} alt="homeImage" />
        </Col>
      </Row>
    </Container>
  );
};

export default AboutUs;
