import axios from "axios";
import React, { useState } from "react";
import { Button, Form, Alert } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
/**
 * Login component to update a user's password in case they forget their password.
 * @param {*} props
 * @returns React component
 */
export default function Login(props) {
  const navigate = useNavigate();
  const [wrong, setWrong] = useState(false);
  const [userName, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [login, setLogin] = useState(false);
  const [invalidFields, setInvalidFields] = useState(false);
  const [forgotPassword, setForgotPassword] = useState(false);
  //  Call the validate API to validate login information
  const handleSubmit = (e) => {
    e.preventDefault();
    const configuration = {
      method: "get",
      url:
        "http://localhost:8080/api/students/validate/" +
        userName +
        "/" +
        password,
    };

    axios(configuration)
      .then((result) => {
        if (result.data == true && !userName.endsWith("@match.com")) {
          setLogin(true);
        } else {
          setWrong(true);
        }
      })
      .catch((error) => {
        setWrong(true);
        error = new Error();
      });
  };

  if (login && !userName.endsWith("@match.com")) {
    navigate("/account", { state: { userName: userName, password: password } });
  } else if (userName.endsWith("@match.com")) {
    return (
      <div>
        <p className="text-danger">Please login as an admin instead!</p>
        <Login></Login>
      </div>
    );
  }

  const handleForgotPassword = (e) => {
    setForgotPassword(true);
  };
  if (forgotPassword) {
    return (
      <div>
        <p className="text-danger">
          Please contact admin@match.com to reset your password!
        </p>
        <Login></Login>
      </div>
    );
  }
  if (wrong) {
    setWrong(false);
    alert("Please provide a valid username and password!!");
  }

  if (invalidFields)
    return (
      <div>
        <p className="text-danger">
          Please login with a @scarletmail.rutgers.edu email address only.
        </p>
        <Login></Login>
      </div>
    );

  return (
    <div>
      <h2>Login</h2>
      <Form onSubmit={(e) => handleSubmit(e)}>
        <Form.Group controlId="formBasicEmail">
          <Form.Label>Email address</Form.Label>
          <Form.Control
            required
            type="email"
            name="email"
            value={userName}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter email"
          />
        </Form.Group>

        <Form.Group controlId="formBasicPassword">
          <Form.Label required>Password</Form.Label>
          <Form.Control
            required
            type="password"
            name="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
          />
        </Form.Group>

        <Button
          variant="primary"
          type="submit"
          onClick={(e) => handleSubmit(e)}
        >
          Login
        </Button>
      </Form>
      <Button
        variant="primary"
        onClick={() => {
          handleForgotPassword();
        }}
      >
        Forgot Password?
      </Button>
      {login ? (
        <p className="text-success">You Are Logged in Successfully</p>
      ) : (
        <p className="text-danger">
          Please log in with a valid @scarletmail.rutgers.edu email address
          only.{" "}
        </p>
      )}
      Don't have an account? You can create an account{" "}
      <Link to="/register">here</Link> instead!
    </div>
  );
}
