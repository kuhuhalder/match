import React, { useState } from "react";
import { Form, Button, Container } from "react-bootstrap";
import { useLocation, useNavigate, Link } from "react-router-dom";
import axios from "axios";

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
  const [passwordsMatch, setPasswordsMatch] = useState(false);
  const { state } = useLocation();
  const handleUpdateProfile = (e) => {
    navigate("/profile", { state: { userName: userName, isAdmin:isAdmin, firstName:firstName, lastName:lastName } });
  };
  const handleRegister = (e) => {
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
        // navigate("/register");
      });
  };
  if (userNameExists){
    return(
      <div>
    <p className="text-danger">Username already exists. Login instead</p>
    
    {
        <Button
          variant="primary"
          type="submit"
          onClick={(e) => {navigate("/login")}}
        >
          Login
        </Button>
      }
      </div>
    )
  }
  if (register && !userName.endsWith("@match.com")) {
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
    navigate("/profile", { state });
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
  // else if(userName =="" || password =="" || firstName =="" || lastName ==""){
  //   return (
  //     <div>
  //       <p className="text-danger">
  //         Please fill out the fields correctly.
  //         <Register></Register>
  //       </p>
        
  //     </div>
  //   );
  // }


  return (
    <Container>
      <h2>Create an Account</h2>
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
        
        {/* {userName.endsWith("@match.com") ? (
          <p className="text-danger">Please register as an admin instead</p>
        ) : (
          <p className="text-success">Email address is valid!</p>
        )} */}

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

        {/* <Button
          onClick={()=> {navigate("/login")}}
        >
          Login
        </Button> */}
      </Form>
      <br></br>
      <Link to="/login">Already have an account? Click here!</Link>
    </Container>
  );
}
