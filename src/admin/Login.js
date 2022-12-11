import axios from "axios";
import React, { useState } from "react";
import { Button, Form } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
/**
 * LoginAdmin component is to validate an admin's login information.
 * @param {*} props 
 * @returns React component
 */
export default function LoginAdmin(props) {
  const navigate = useNavigate();
  const [wrong, setWrong] = useState(false);
  const [userName, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [login, setLogin] = useState(false);
  // handleSubmit function is to call the validate API to validate an admin's login information
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
        if (result.data == true && userName.endsWith("@match.com")) {
          setLogin(true);
        } else {
          setWrong(true);
        }
      })
      .catch((error) => {
        error = new Error();
      });
  };

  if (login && userName.endsWith("@match.com")) {
    navigate("/viewaccount", {
      state: { userName: userName, password: password },
    });
  } else if (!userName.endsWith("@match.com")) {
    <p className="text-danger">Please use a valid @match.com email address!</p>;
  }
  // handleForgotPassword function is to redirect to forgotPass and change an admin's password
  const handleForgotPassword = (e) => {
    navigate("/forgotpass", {
      state: { id: userName, userName: userName, isAdmin: 1 },
    });
  };
  if (wrong) {
    return (
      <div>
        <div> Please provide a valid username and password!! </div>
        <LoginAdmin></LoginAdmin>
      </div>
    );
  }

  return (
    <div>
      <h2>Login</h2>
      <Form onSubmit={(e) => handleSubmit(e)}>
        {/* email */}
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

        {!userName.endsWith("@match.com") ? (
          <p className="text-danger">Please login with a @match.com email</p>
        ) : (
          <p className="text-success">Valid email address!</p>
        )}
        {/* password */}
        <Form.Group controlId="formBasicPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control
            required
            type="password"
            name="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
          />
        </Form.Group>

        {/* submit button */}
        <Button
          variant="primary"
          type="submit"
          onClick={(e) => handleSubmit(e)}
        >
          Login
        </Button>

        {/* forgot password button */}
        <Button
          variant="primary"
          type="submit"
          onClick={(e) => {
            handleForgotPassword();
          }}
        >
          Forgot Password?
        </Button>

        {login ? (
          <p className="text-success">You Are Logged in Successfully</p>
        ) : (
          <p className="text-danger">
            Please login with a valid @match.com email address
          </p>
        )}
      </Form>

      <Link to="/registeradmin">
        Don't have an account? You can create an account here!
      </Link>
    </div>
  );
}
