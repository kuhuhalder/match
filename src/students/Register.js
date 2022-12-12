import axios from "axios";
import React, { useState } from "react";
import { Button, Container, Form } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
/**
 * Register component is to register a new student on our platform.
 * @param {*} props
 * @returns React component
 */
export default function Register(props) {
  const navigate = useNavigate();
  const [userName, setEmail] = useState("");
  const [id, setId] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [password, setPassword] = useState("");
  const [isAdmin, setIsAdmin] = useState(0);
  const [register, setRegister] = useState(false);
  const [userNameExists, setUserNameExists] = useState(false);
  const [emptyFields, setEmptyFields] = useState(false);
  const [invalidFields, setInvalidFields] = useState(false);
  // handleUpdateProfile function is to redirect to the update profile page
  const handleUpdateProfile = (e) => {
    navigate("/profile", {
      state: {
        userName: userName,
        isAdmin: isAdmin,
        firstName: firstName,
        lastName: lastName,
      },
    });
  };
  //  handleRegister function is to call the add API to add a new Student object
  const handleRegister = (e) => {
    if (userName == "" || password == "" || firstName == "" || lastName == "") {
      setEmptyFields(true);
    }
    if (
      userName.endsWith("@match.com") ||
      !userName.endsWith("scarletmail.rutgers.edu")
    ) {
      invalidFields(true);
    }

    e.preventDefault();
    const configuration = {
      method: "post",
      url: "http://localhost:8080/api/students/add",
      data: {
        id,
        userName,
        firstName,
        lastName,
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
        setUserNameExists(true);
      });
  };
  if (emptyFields) {
    alert("Please fill out all the fields.");
    setEmptyFields(false);
    // return (
    //   <div>
    //     <p className="text-danger">Please fill out the all the fields.</p>
    //     <Register></Register>
    //   </div>
    // );
  }
  if (invalidFields) {
    return (
      <div>
        <p className="text-danger">
          Please register with a @scarletmail.rutgers.edu email address only.
        </p>
        <Register></Register>
      </div>
    );
  }

  if (userNameExists) {
    return (
      <div>
        alert("Username already exists. Please try again.")
        <Button
          variant="primary"
          type="submit"
          onClick={(e) => {
            navigate("/login");
          }}
        >
          Login
        </Button>
      </div>
    );
  }
  if (
    register &&
    !userName.endsWith("@match.com") &&
    userName.endsWith("scarletmail.rutgers.edu")
  ) {
    return (
      <div>
        <p className="text-success">
          You Are Registered Successfully. Click here to add the rest of your
          details.
          <br></br>
          <Button
            variant="primary"
            type="submit"
            onClick={(e) => handleUpdateProfile(e)}
          >
            Update Profile
          </Button>
        </p>
      </div>
    );
  } else if (userName.endsWith("@match.com")) {
    return (
      <div>
        <p className="text-danger">
          Please register as an admin instead with the @match.com email address.
        </p>
        <Register></Register>
      </div>
    );
  }

  return (
    <Container>
      <h2>Create an Account</h2>

      <Form onSubmit={(e) => handleRegister(e)}>
        <Form.Group controlId="formBasicEmail" required>
          <Form.Label>Email address</Form.Label>
          <p>Your email address is your username</p>
          <Form.Control
            required
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
        {!userName.endsWith("@scarletmail.rutgers.edu") ? (
          <p className="text-danger">
            Please register using a @scarletmail.rutgers.edu email address only.
          </p>
        ) : (
          <p className="text-success">Email address is valid!</p>
        )}

        <Form.Group className="mb-3" controlId="formFirstName" required>
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
      <br></br>
      <Link to="/login">Already have an account? Click here to login!</Link>
    </Container>
  );
}
