import Axios from "axios";
import React, { useState } from "react";
import { Container, Row } from "react-bootstrap";
import Button from "react-bootstrap/Button";
import Table from "react-bootstrap/Table";
import { useLocation, useNavigate } from "react-router-dom";
// ViewCourses component is to view all the courses.
function ViewCourses() {
  const navigate = useNavigate();
  const { state } = useLocation();
  const [ids, setIds] = useState([]);
  const [del, setDelete] = useState(false);
  const [userName, setUserName] = useState(state.userName);

  Axios.get("http://localhost:8080/api/students/getAllCourses")
    .then(function (result) {
      setIds(result.data);
    })
    .catch((error) => {
      console.log(error);
      error = new Error();
    });
  const deleteCourse = (e) => {
    Axios.delete("http://localhost:8080/api/students/deleteCourse/" + e)
      .then(function (result) {
        setDelete(true);
      })
      .catch((error) => {
        console.log(error);
        error = new Error();
      });
  };

  return (
    <Container>
      <Row>
        <Container>
          <h1> Course List</h1>
          <Button
            type="submit"
            onClick={() =>
              navigate("/viewaccount", { state: { userName: userName } })
            }
          >
            Go back to Account
          </Button>

          <Table striped bordered hover>
            <thead>
              <tr>
                <th> Course Id </th>
                <th> Course Name </th>
              </tr>
            </thead>
            <tbody>
              {ids.map((val1, key) => {
                return (
                  <>
                    <tr>
                      <td>
                        <b>{val1.id}</b>
                      </td>
                      <td>{val1.courseName}</td>

                      <td>
                        <Button
                          variant="primary"
                          type="button"
                          onClick={() => deleteCourse(val1.id)}
                        >
                          Delete
                        </Button>
                      </td>
                    </tr>
                  </>
                );
              })}
            </tbody>
          </Table>
        </Container>
      </Row>
    </Container>
  );
}

export default ViewCourses;
