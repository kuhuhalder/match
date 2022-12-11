import axios from "axios";
import React, { useState } from "react";
import { Button, Form } from "react-bootstrap";
import { useLocation, useNavigate } from "react-router-dom";
import NavBarAdmin from "../components/NavBarAdmin";
/**
 * UpdateProfile component is to update the admin's profile information.
 * @param {*} props 
 * @returns React component
 */
function UpdateProfile(props) {
  const location = useLocation();
  const navigate = useNavigate();
  const [id, setId] = useState(location.state.id);
  const [userName, setUserName] = useState(location.state.userName);
  const [firstName, setFirstName] = useState(location.state.firstName);
  const [lastName, setLastName] = useState(location.state.lastName);
  const [isAdmin, setIsAdmin] = useState(1);
  const [register, setRegister] = useState(false);
  // handleSubmit function is to call the update API to update the admin's information
  const handleSubmit = (e) => {
    e.preventDefault();
    const configuration = {
      method: "post",
      url: "http://localhost:8080/api/students/update",
      data: {
        id,
        userName,
        firstName,
        lastName,
        isAdmin,
      },
    };
    console.log(configuration);

    axios(configuration)
      .then((result) => {
        setRegister(true);
        navigate("/viewaccount", { state: { userName: userName } });
      })
      .catch((error) => {
        console.log(error);
        error = new Error();
      });
  };

  return (
    <div>
      <NavBarAdmin></NavBarAdmin>
      <h2>
        Welcome {firstName} {lastName}!
      </h2>
      <h3>Update your profile!</h3>
      <Form onSubmit={(e) => handleSubmit(e)}>
        <Form.Group controlId="formFirstName">
          <Form.Label>First Name</Form.Label>
          <Form.Control
            type="firstName"
            name="firstName"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            placeholder="Enter first name"
          />
          <Form.Label>Last Name</Form.Label>
          <Form.Control
            type="lastName"
            name="lastName"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
            placeholder="Enter last name"
          />
          <Button
            variant="primary"
            type="submit"
            onClick={(e) => handleSubmit(e)}
          >
            Submit
          </Button>
        </Form.Group>
      </Form>
    </div>
  );
}
export default UpdateProfile;
