import axios from "axios";
import React, { useState } from "react";
import { Button, Form } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
//  Login component is to verify if an username exists and if the password is correct
export default function Login(props) {
  const navigate = useNavigate();
  const [wrongDisp, setWrongDisp] = useState(<div></div>);
  const [wrong, setWrong] = useState(false);
  const [userName, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [login, setLogin] = useState(false);
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
        error = new Error();
      });
  };

  if (login && !userName.endsWith("@match.com")) {
    navigate("/account", { state: { userName: userName, password: password } });
  } else if (userName.endsWith("@match.com")) {
    <p className="text-danger">Please login as an admin instead!</p>;
  }

  const handleForgotPassword = (e) => {
    navigate("/forgotpass", { state: { id: userName, userName: userName, isAdmin:0 } });
  };
  
  if (wrong) {
    return (
      <div>
        <div> Username doesn't exist or password is incorrect </div>
        <Login></Login>
      </div>
    );
  }

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
          <p className="text-danger">You Are Not Logged in</p>
        )}
      </Form>
      <br></br>
      <Link to="/">Don't have an account?  here!</Link>
    </div>
  );
}
