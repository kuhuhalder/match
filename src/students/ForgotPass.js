import { Navigate, useLocation, useNavigate } from "react-router-dom";
import React, { useState } from "react";
import { Form, Button, Container } from "react-bootstrap";
import axios from "axios";
// ForgotPass component to update a user's password in case they forget their password
const ForgotPass = (props) => {
  const navigate = useNavigate();
  const location = useLocation();
  const [id, setId] = useState(location.state.userName);
  const [userName, setUserName] = useState(location.state.userName);
  const [password, setPassword] = useState("");
  const [isAdmin, setIsAdmin] = useState(location.state.isAdmin);
  const [passwordReset, setPasswordReset] = useState(false);
  const [noUsername, setNoUserName] = useState(false);
  //  Function to make an API call to update and update a user's password
  const handleResetPassword = (e) => {
    const configuration = {
      method: "post",
      url: "http://localhost:8080/api/students/update",
      data: {
        id,
        userName,
        password,
        isAdmin,
      },
    };
    console.log(configuration);

    axios(configuration)
      .then(function (result) {
        setPasswordReset(true);
      })
      .catch((error) => {
        console.log(error);
        setNoUserName(true);
        error = new Error();
      });
  };

  if (passwordReset && isAdmin == 0) {
    return (
      <div>
        <p className="text-success">Password changed successfully</p>
        <Button
          variant="primary"
          type="submit"
          onClick={() => {
            navigate("/viewallstudents", {
              state: { userName: location.state.loggedInUser },
            });
          }}
        >
          Go back to view all students.
        </Button>
      </div>
    );
  }

  if (passwordReset && isAdmin == 1) {
    return (
      <div>
        <p className="text-success">Password changed successfully</p>
        <Button
          variant="primary"
          type="submit"
          onClick={() => {
            navigate("/loginadmin");
          }}
        >
          Login
        </Button>
      </div>
    );
  }
  if (noUsername) {
    return (
      <div>
        <p className="text-danger">Username doesn't exist. Please try again.</p>
        <Button
          variant="primary"
          type="submit"
          onClick={() => {
            navigate("/");
          }}
        >
          Home
        </Button>
      </div>
    );
  }
  return (
    <Container>
      <h2>Forgot Password</h2>
      <Form onSubmit={(e) => handleResetPassword(e)}>
        <Form.Group className="mb-3" controlId="formUsername">
          <Form.Label>Username</Form.Label>
          <Form.Control
            type="Username"
            name="Username"
            value={userName}
            onChange={(e) => {
              setUserName(e.target.value);
              setId(e.target.value);
            }}
            placeholder="Enter username"
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="formPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="Password"
            name="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Enter new password"
          />
        </Form.Group>
      </Form>
      <Button
        variant="primary"
        type="submit"
        onClick={(e) => handleResetPassword(e)}
      >
        Change Password
      </Button>
    </Container>
  );
};
export default ForgotPass;
