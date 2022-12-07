import { Navigate, useLocation, useNavigate } from "react-router-dom";
import React, { useState } from "react";
import { Form, Button } from "react-bootstrap";
import axios from "axios";
// ForgotPass component to update a user's password in case they forget their password
const ForgotPass = (props) => {
  const navigate = useNavigate();
  const location = useLocation();
  const [id, setId] = useState("");
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [passwordReset, setPasswordReset] = useState(false);
  //  Function to make an API call to update and update a user's password
  const handleResetPassword = (e) => {
    const configuration = {
      method: "post",
      url: "http://localhost:8080/api/students/update",
      data: {
        id,
        userName,
        password,
      },
    };
    console.log(configuration);

    axios(configuration)
      .then(function (result) {
        setPasswordReset(true);
      })
      .catch((error) => {
        console.log(error);
        error = new Error();
      });
  };

  if (passwordReset) {
    return (
      <div>
        <p className="text-success">Password changed successfully</p>
        <Button
          variant="primary"
          type="submit"
          onClick={() => {
            navigate("/login");
          }}
        >
          Login
        </Button>
      </div>
    );
  }
  return (
    <div>
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
    </div>
  );
};
export default ForgotPass;
