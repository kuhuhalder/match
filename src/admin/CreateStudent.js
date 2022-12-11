import React, { useState } from "react";
import { Form, Button } from "react-bootstrap";
import { useNavigate, useLocation } from "react-router-dom";
import axios from "axios";
import NavBarAdmin from "../components/NavBarAdmin";
// CreateStudent component gives admin the functionality to create a new student account
export default function CreateStudent(props) {
  const navigate = useNavigate();
  const location = useLocation();
  const [userName, setUsername] = useState(location.state.userName);
  const [email, setEmail] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [id, setId] = useState("");
  const [password, setPassword] = useState("");
  const [isAdmin, setIsAdmin] = useState(0);
  const [register, setRegister] = useState(false);
  const [userNameExists, setAccExists] = useState(false);
  const [emptyFields, setEmptyFields] = useState(false);
  const [validated, setValidated] = useState(false);
  // handleRegister function calls the add API to create a student.
  const handleRegister = (e) => {
    e.preventDefault();

    if (email == "" || password == "" || firstName == "" || lastName == "") {
      setEmptyFields(true);
    }
    const form = e.currentTarget;
    if (form.checkValidity() === false) {
      e.preventDefault();
      e.stopPropagation();
    } else {
      setValidated(true);

      if (
        email.endsWith("@match.com") ||
        !email.endsWith("scarletmail.rutgers.edu")
      ) {
        return (
          <div>
            <p className="text-danger">
              Please register a student using a valid @scarletmail.rutgers.edu
              email only.
            </p>
            <CreateStudent></CreateStudent>
          </div>
        );
      }
      const configuration = {
        method: "post",
        url: "http://localhost:8080/api/students/add",
        data: {
          id,
          userName: email,
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
          setAccExists(true);
          error = new Error();
        });
    }
  };

  if (userNameExists) {
    return (
      <div>
        <p className="text-danger">
          Username already exists. Use a different email address/ username.
        </p>
        <CreateStudent></CreateStudent>
      </div>
    );
  }
  if (register && !email.endsWith("@match.com")) {
    <div>
      <p className="text-success">
        Student is registered successfully. Click here to add the rest of the
        profile details.
      </p>
    </div>;
    navigate("/editprofile", {
      state: {
        userName: email,
        loggedInUser: userName,
        firstName: firstName,
        lastName: lastName,
      },
    });
  }
  if (emptyFields) {
    return (
      <div>
        <p className="text-danger">Please fill out the all the fields.</p>
        <CreateStudent></CreateStudent>
      </div>
    );
  }

  return (
    <div>
      <NavBarAdmin></NavBarAdmin>
      <h2>Create a Student Account</h2>
      <Form
        noValidate
        validated={validated}
        onSubmit={(e) => handleRegister(e)}
      >
        <Form.Group controlId="formBasicEmail">
          <Form.Label>Email address</Form.Label>
          <p>Your email address is your username</p>
          <Form.Control
            type="email"
            name="email"
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
              setId(e.target.value);
            }}
            required
            placeholder="Enter email"
          />
          <Form.Control.Feedback type="invalid">
            Please choose a username.
          </Form.Control.Feedback>
        </Form.Group>
        {!email.endsWith("@scarletmail.rutgers.edu") ? (
          <p className="text-danger">
            Please register a student using a valid @scarletmail.rutgers.edu
            email only.
          </p>
        ) : (
          <p className="text-success">Email address is valid!</p>
        )}

        <Form.Group className="mb-3" controlId="formFirstName">
          <Form.Label>First Name</Form.Label>
          <Form.Control
            required
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
            required
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
          onClick={(e) => handleRegister(e)}
        >
          Register
        </Button>
      </Form>
    </div>
  );
}
