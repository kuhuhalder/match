import React from "react";
import { Col, Container, Row } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import "./css/Home.css";
import banner from "./images/banner.jpeg";
const AboutUs = () => {
  const navigate = useNavigate();
  return (
    <Container>
      <Row>
        <Col></Col>
        <Col>
          <div>
            <img class = "banner" src={banner} alt="banner" />
            <h4>
              MATCH is a web-app that pairs students or forms groups where
              students can study together.
            </h4>
          </div>
        </Col>
        <Col></Col>
      </Row>
    </Container>
  );
};

export default AboutUs;
