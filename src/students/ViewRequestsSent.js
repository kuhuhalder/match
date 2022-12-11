import axios from "axios";
import React, { useState } from "react";
import { Button, Container, Table } from "react-bootstrap";
import { useLocation, useNavigate } from "react-router-dom";
import NavBar from "../components/NavBar";
/**
 * ViewRequestsSent component is to view the match requests sent by the logged in student.
 * @param {*} props 
 * @returns React component
 */
const ViewRequestsSent = (props) => {
  const { state } = useLocation();
  const navigate = useNavigate();
  const [userName, setUserName] = useState(state.userName);
  const [ids, setIds] = useState([]);

  const configuration = {
    method: "get",
    url: "http://localhost:8080/api/students/findRequestsSent/" + userName,
  };
  console.log(configuration);

  axios(configuration)
    .then((result) => {
      console.log(result);
      setIds(result.data);
    })
    .catch((error) => {
      console.log(error);
      error = new Error();
    });

  return (
    <Container>
      <NavBar></NavBar>
      <h2>View Your Requests Sent!</h2>
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
                    onClick={() =>
                      navigate("/requestssentprofile", {
                        state: {
                          userName: val.userName,
                          loggedInUser: userName,
                        },
                      })
                    }
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
  );
};
export default ViewRequestsSent;
