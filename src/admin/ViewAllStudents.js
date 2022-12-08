import axios from "axios";
import React, { useState } from "react";
import { Button, Table } from "react-bootstrap";
import { useLocation, useNavigate } from "react-router-dom";
// ViewAllStudents component is to view all the students in the system.
const ViewAllStudents = (props) => {
  const location = useLocation();
  const navigate = useNavigate();
  const [ids, setIds] = useState([]);
  const [userName, setUserName] = useState(location.state.userName);

  // handleViewProfile function redirects to the profile page of the student.
  const handleViewProfile = (e) => {
    navigate("/viewprofilestudent", { state: { userName: e, loggedInUser: userName } });
  };
  const configuration = {
    method: "get",
    url: "http://localhost:8080/api/students/getAll/",
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

  return (
    <div className="ViewAllStudents">
      <div id="page-wrap">
        <h2> View All Students</h2>
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
              <th>Username</th>
              <th>Name</th>
              <th>Course</th>
              <th>Year</th>
              <th>Major</th>
              <th>Pronouns</th>
            </tr>
          </thead>
          <tbody>
            {ids.map((val, key) => {
              return (
                <tr key={key}>
                  <td>{val.userName}</td>
                  <td>{val.firstName}</td>
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
      </div>
    </div>
  );
};
export default ViewAllStudents;
