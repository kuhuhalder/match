import axios from "axios";
import React, { useState } from "react";
import { Button, Modal, Table } from "react-bootstrap";
import { useLocation, useNavigate } from "react-router-dom";
// ViewAllStudents component is to view all the students in the system.
const ViewAllStudents = (props) => {
  const location = useLocation();
  const navigate = useNavigate();
  const [ids, setIds] = useState([]);
  const [userName, setUserName] = useState(location.state.userName);
  const [del, setDelete] = useState(false);
  const [show, setShow] = useState(false);
  const [toDelete, settoDelete] = useState("");
  const handleClose = () => setShow(false);
  const handleShow = (e) => {
    setShow(true);
    settoDelete(e);
  };

  // handleViewProfile function redirects to the profile page of the student.
  const handleViewProfile = (e) => {
    navigate("/viewprofilestudent", {
      state: { userName: e, loggedInUser: userName },
    });
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
  // deleteStudent function allows the admin to delete a student.
  const onDeleteYes = (e) => {
    setShow(false);
    const configuration = {
      method: "delete",
      url: "http://localhost:8080/api/students/delete/" + toDelete,
    };
    console.log(configuration);
    axios(configuration)
      .then((result) => {
        setDelete(true);
        navigate("/viewallstudents", { state: { userName: userName } });
      })
      .catch((error) => {
        console.log(error);
        error = new Error();
      });
  };

  return (
    <div className="ViewAllStudents">
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Delete Student</Modal.Title>
        </Modal.Header>
        <Modal.Body>Do you want to delete this student?</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            No
          </Button>
          <Button variant="primary" onClick={() => onDeleteYes()}>
            Yes
          </Button>
        </Modal.Footer>
      </Modal>
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
                      type="primary"
                      onClick={() => handleViewProfile(val.userName)}
                    >
                      View Profile
                    </Button>
                  </td>
                  <td>
                    {" "}
                    <Button
                      type="primary"
                      onClick={() => handleShow(val.userName)}
                    >
                      Delete Student
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
