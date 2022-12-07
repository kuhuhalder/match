import React, { useState, useEffect } from "react";
import Axios from "axios";
import { useNavigate, useLocation } from "react-router-dom";
import Table from "react-bootstrap/Table";
import {Container, Row} from "react-bootstrap";
import Button from "react-bootstrap/Button";
import NavBar from "../components/NavBar";
function ViewCourses() {
  const navigate = useNavigate();
  const { state } = useLocation();
  const [ids, setIds] = useState([]);
  const [del, setDelete] = useState(false);

  // const [username, setUsername] = useState('');

  // const [selectedInsuranceName, setSelectedInsuranceName] = useState('');
  // const [selectedPlanName, setSelectedPlanName] = useState('');
  // const [selectedYearlyCost, setSelectedYearlyCost] = useState('');
  // const [offeredInsurancesList, setOfferedInsurancesList] = useState([]);

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
      {/* <Row>
                <NavBar></NavBar>
            </Row> */}
      <br />
      <Row>
        <Container>
          <h1> Course List</h1>
          <br />

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
