import axios from "axios";
import React, { useState } from "react";
import { Col, Row, Container } from "react-bootstrap";
import { useLocation, useNavigate } from "react-router-dom";
import NavBar from "../components/NavBar";
import "../css/Account.css";
/**
 * Account component to display the current logged in user's information.
 * @param {*} props
 * @returns React component
 */
const Account = (props) => {
  const location = useLocation();
  const navigate = useNavigate();
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [pronouns, setPronouns] = useState("");
  const [contactInfo, setContactInfo] = useState(null);
  const [campus, setCampus] = useState("");
  const [course, setCourse] = useState([]);
  const [major, setMajor] = useState("");
  const [bio, setBio] = useState("");
  const [year, setYear] = useState("");
  const [genderPreference, setGenderPreference] = useState("");
  const [userName, setUserName] = useState(location.state.userName);
  //  Calling the getStudent API to get the information of the logged in user
  const configuration = {
    method: "get",
    url: "http://localhost:8080/api/students/getStudent/" + userName,
  };
  console.log(configuration);
  axios(configuration)
    .then((result) => {
      setFirstName(result.data.firstName);
      setLastName(result.data.lastName);
      setPronouns(result.data.pronouns);
      setContactInfo(result.data.contactInfo);
      setCampus(result.data.campus);
      setCourse(result.data.course);
      setMajor(result.data.major);
      setBio(result.data.bio);
      setYear(result.data.year);
      setGenderPreference(result.data.genderPreference);
    })
    .catch((error) => {
      console.log(error);
      error = new Error();
    });

  return (
    <Container>
      <Row>
        <NavBar></NavBar>
      </Row>
      <Col>
        <h1>
          Welcome {firstName} {lastName}!
        </h1>
        <div>
          <h2>Your information</h2>
          <h4>
            Username: <b>{userName} </b>
          </h4>
          <h4>
            {" "}
            First Name: <b>{firstName} </b>
          </h4>
          <h4>
            {" "}
            Last Name: <b>{lastName} </b>
          </h4>
          <h4>
            {" "}
            Contact Information: <b>{contactInfo} </b>
          </h4>
          <h4> Pronouns: {pronouns}</h4>
          <h4> Campus: {campus}</h4>
          <h4>
            {" "}
            Courses:{" "}
            <b>
              {course ? (
                course.map((val) => (
                  <ul>
                    <li>- {val}</li>
                  </ul>
                ))
              ) : (
                <p></p>
              )}
            </b>
          </h4>
          <h4> Major: {major}</h4>
          <h4> Year: {year}</h4>
          <h4>
            {" "}
            Gender Preferences: <b> {genderPreference} </b>
          </h4>
          <h4> Bio: {bio}</h4>
        </div>
      </Col>
    </Container>
  );
};
export default Account;
