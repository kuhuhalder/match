import React from "react";
import { Col, Container, Row, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import "./css/Home.css";
import banner from "./images/banner.jpeg";
/**
 * AboutUs component to display the information about the project.
 * @param {*} props 
 * @returns React component
 */
const AboutUs = () => {
  const navigate = useNavigate();
  return (
    <Container>
      <Row>
        <Col></Col>
        <Col>
          <div>
            <img class="banner" src={banner} alt="banner" />
            <p>
              <b>Why?</b>
              <br></br> In a post-COVID era where classes moved to a hybrid form
              of instruction, it has been increasingly difficult to find people
              in our classes who we can study or get to know people outside of
              classes. We have realized that knowing classmates and peers within
              classes is of utmost importance. Therefore, we are creating a
              platform/ service for students to meet fellow students, form
              friendships, and gain support in classes. <br></br>
              <b>What?</b>
              <br></br> Meet, MATCH is a web-app that pairs/ matches students
              based on similar interests. It forms a sense of community among
              students. <br></br>
              <b>How?</b>
              <br></br> MATCH is built on React.js for the front-end and Spring
              Boot + Java on the backend. We used MongoDB (NoSQL) as a database.
              We created APIs in Spring Boot that is called using React.
            </p>
            <Button
              variant="custom"
              type="submit"
              onClick={() => {
                navigate("/");
              }}
            >
              Go back to home!
            </Button>
          </div>
        </Col>
        <Col></Col>
      </Row>
    </Container>
  );
};

export default AboutUs;
