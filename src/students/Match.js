import axios from "axios";
import React, { useState } from "react";
import { Button, Col, Container, Table } from "react-bootstrap";
import { useLocation, useNavigate } from "react-router-dom";
import NavBar from "../components/NavBar";
import "../css/Match.css";
/**
 * Match component to display a list of all possible matches determined by our matching algorithm.
 * @param {*} props
 * @returns React component
 */
const Match = (props) => {
  const location = useLocation();
  const navigate = useNavigate();
  const [firstName, setFirstName] = useState(location.state.firstName);
  const [lastName, setLastName] = useState(location.state.lastName);
  const [userName2, setUserName2] = useState(location.state.userName);

  const [ids, setIds] = useState([]);
  //  Call the matches API on the username of the logged-in user to fetch the list of Matches object
  const configuration = {
    method: "get",
    url:
      "http://localhost:8080/api/students/matches/" + location.state.userName,
  };
  console.log(configuration);
  axios(configuration)
    .then((result) => {
      setIds(result.data);
    })
    .catch((error) => {
      console.log(error);
      error = new Error();
    });

  const handleViewProfile = (e) => {
    navigate("/viewprofilematches", {
      state: {
        userName: e,
        userName2: userName2,
        firstName: firstName,
        lastName: lastName,
      },
    });
  };

  return (
    <Container>
      <Col>
        <NavBar></NavBar>
      </Col>
      <Col>
        <Container>
          <h2>
            {firstName} {lastName}, View Your Potential Matches!
          </h2>
          <p>
            View the list of potential matches that our system thinks might be
            best fit for you based on your preferences.{" "}
          </p>
          <Table striped hover>
            <thead>
              <tr>
                <th>Name</th>
                <th>Course</th>
                <th>Year</th>
                <th>Major</th>
                <th>Pronouns</th>
                <th>View Profile</th>
              </tr>
            </thead>
            <tbody>
              {ids.map((val, key) => {
                return (
                  <tr key={key}>
                    <td>
                      {val.firstName} {val.lastName}
                    </td>
                    <td>{val.course}</td>
                    <td>{val.year}</td>
                    <td>{val.major}</td>
                    <td>{val.pronouns}</td>
                    <td>
                      <Button
                        type="submit"
                        onClick={() => handleViewProfile(val.userName)}
                      >
                        View Profile
                      </Button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </Table>
        </Container>
      </Col>
    </Container>
  );
};
export default Match;
