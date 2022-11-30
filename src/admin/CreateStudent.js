import React, { useState } from "react";
import { Form, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export default function Register(props) {
  const navigate = useNavigate();
  const [userName, setEmail] = useState("");
  const [id, setId] = useState("");
  const [password, setPassword] = useState("");
  const [isAdmin, setIsAdmin] = useState(0);
  const [register, setRegister] = useState(false);

  const handleRegister = (e) => {
    e.preventDefault();
    const configuration = {
      method: "post",
      url: "http://localhost:8080/api/students/add",
      data: {
        id,
        userName,
        password,
        isAdmin,
      },
    };
    console.log(configuration);
    axios(configuration)
      .then((result) => {
        setRegister(true);
      })
      .catch((error) => {
        error = new Error();
      });
  };
  if (register && !userName.endsWith("@match.com")) {
    <div>
      <p className="text-success">
        You Are Registered Successfully. Click here to add the rest of your
        details
      </p>
    </div>;
    navigate("/profile", { state: { userName: userName } });
  } else if (userName.endsWith("@match.com")) {
    <div>
      <p className="text-danger">
        Please register as an admin instead with the @match.com email address
      </p>
    </div>;
  } else {
    <div>
      <p className="text-danger">Username already exists. Login instead</p>

      {
        <Button
          variant="primary"
          type="submit"
          onClick={(e) => {
            navigate("./login");
          }}
        >
          Login
        </Button>
      }
    </div>;
  }
  const handleUpdateProfile = (e) => {
    navigate("/profile", { state: { userName: userName, isAdmin: isAdmin } });
  };

  return (
    <>
      <h2>Create an Account</h2>
      <Form onSubmit={(e) => handleRegister(e)}>
        <Form.Group controlId="formBasicEmail">
          <Form.Label>Email address</Form.Label>
          <Form.Control
            type="email"
            name="email"
            value={userName}
            onChange={(e) => {
              setEmail(e.target.value);
              setId(e.target.value);
            }}
            placeholder="Enter email"
          />
        </Form.Group>

        {userName.endsWith("@match.com") ? (
          <p className="text-danger">Please register as an admin instead</p>
        ) : (
          <p className="text-success">Email address is valid!</p>
        )}

        <Form.Group controlId="formBasicPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            name="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
          />
        </Form.Group>

        {/* <label> Account Type </label>
        <div>
          <input
            type="radio"
            name="role"
            value="student"
            id="student"
            onChange={(event) => {
              setIsAdmin(0);
            }}
          />
          <label for="student"> Student </label>
        </div>
        <div>
          <input
            type="radio"
            name="role"
            value="admin"
            id="admin"
            placeholder="Admin"
            onChange={(event) => {
              setIsAdmin(1);
            }}
          />
          <label for="admin"> Admin </label>
        </div> */}

        {/* submit button */}
        <Button
          variant="primary"
          type="submit"
          onClick={(e) => handleRegister(e)}
        >
          Register
        </Button>

        {register ? (
          <div>
            <p className="text-success">
              You Are Registered Successfully. Click here to add the rest of
              your details
            </p>

            {
              <Button
                variant="primary"
                type="submit"
                onClick={(e) => handleUpdateProfile(e)}
              >
                Update Profile
              </Button>
            }
          </div>
        ) : (
          <div>
            <p className="text-danger">
              Username already exists. Login instead
            </p>

            {
              <Button
                variant="primary"
                type="submit"
                onClick={(e) => {
                  navigate("/login");
                }}
              >
                Login
              </Button>
            }
          </div>
        )}
      </Form>
    </>
  );
}
