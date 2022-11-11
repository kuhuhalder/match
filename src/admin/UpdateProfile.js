import React, { useState } from "react";
import { Form, Button } from "react-bootstrap";
import axios from "axios";
import { Navigate, useNavigate, useLocation } from "react-router-dom";

function UpdateProfile(props) {
  const location = useLocation();
  const navigate = useNavigate();
  const [id, setId] = useState(location.state.id);
  const [userName, setUserName] = useState(location.state.userName);
  const [firstName, setFirstName] = useState(null);
  const [lastName, setLastName] = useState(null);
  const [register, setRegister] = useState(false);

  const handleSubmit = (e) => {
    // prevent the form from refreshing the whole page
    e.preventDefault();

    // set configurations
    const configuration = {
      method: "post",
      url: "http://localhost:8080/api/students/update",
      data: {
        id,
        userName,
        firstName,
        lastName,
      },
    };
    console.log(configuration);

    axios(configuration)
      .then((result) => {
        setRegister(true);
        navigate('/viewaccount', {state:{userName:userName}});
      })
      .catch((error) => {
        console.log(error);
        error = new Error();
      });
  };
  return (
    <>
      <h4>Welcome {userName}!</h4>
      <div>Update your profile!</div>
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
    </>
  );
}
export default UpdateProfile;
