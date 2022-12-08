import React, { useState } from "react";
import { Form, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import NavBarAdmin from "../components/NavBarAdmin";
// CreateStudent component gives admin the functionality to create a new student account
export default function CreateStudent(props) {
  const navigate = useNavigate();
  const [userName, setEmail] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [id, setId] = useState("");
  const [password, setPassword] = useState("");
  const [isAdmin, setIsAdmin] = useState(0);
  const [register, setRegister] = useState(false);
  // handleRegister function calls the add API to create a student.
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
    navigate("/editprofile", { state: { userName: userName } });
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
            navigate("/login");
          }}
        >
          Login
        </Button>
      }
    </div>;
  }

  return (
    <div>
      <NavBarAdmin></NavBarAdmin>
      <h2>Create a Student Account</h2>
      <Form onSubmit={(e) => handleRegister(e)}>
        <Form.Group controlId="formBasicEmail">
          <Form.Label>Email address</Form.Label>
          <p>Your email address is your username</p>
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

        <Form.Group className="mb-3" controlId="formFirstName">
          <Form.Label>First Name</Form.Label>
          <Form.Control
            type="firstName"
            name="firstName"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            placeholder="Enter first name"
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="formLastName">
          <Form.Label>Last Name</Form.Label>
          <Form.Control
            type="lastName"
            name="lastName"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
            placeholder="Enter last name"
          />
        </Form.Group>

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
        <Button
          variant="primary"
          type="submit"
          onClick={(e) => handleRegister(e)}
        >
          Register
        </Button>
      </Form>
    </div>
  );
}
