import React, { useState } from "react";
import { Form, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import ReactDOM from "react-dom/client";
import Login from "./Login";
import Profile from "./Profile";

export default function Register(props) {

  const navigate = useNavigate();
  // initial state
  const [userName, setEmail] = useState("");
  const [id, setId] = useState("");
  const [password, setPassword] = useState("");
  const [accountType, setType] = useState("");
  const [register, setRegister] = useState(false);

  const handleSubmit = (e) => {

    
    // prevent the form from refreshing the whole page
    e.preventDefault();

    // set configurations
    const configuration = {
      method: "post",
      url: "http://localhost:8080/api/students/add",
      data: {
        id,
        userName,
        password,
        accountType
      },
    };

    console.log(configuration);

    // make the API call
    axios(configuration)
      .then((result) => {
        setRegister(true);
      })
      .catch((error) => {
        error = new Error();
      });
  };

  const handleLogin = (e) => {
    const element = <Profile userName = {userName} root = {props.root}/>;
    props.root.render(element);
  }

  return (
    <>
      <h2>Register</h2>
      <Form onSubmit={(e) => handleSubmit(e)}>
        {/* email */}
        <Form.Group controlId="formBasicEmail">
          <Form.Label>Email address</Form.Label>
          <Form.Control
            type="email"
            name="email"
            value={userName}
            onChange={(e) => {
              setEmail(e.target.value)
              setId(e.target.value)
            }}
            placeholder="Enter email"
          />
        </Form.Group>

        {/* password */}
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

        <label> Account Type </label>
        <div>
            <input 
            type="radio" name="role" value="student" id="student" 
            onChange={(event) => {
                setType(event.target.value);
            }} 
            />
            <label for="student"> Student </label>
        </div>
        <div>
            <input 
            type="radio" name="role" value="admin" id="admin" 
            placeholder='Admin'
            onChange={(event) => {
                setType(event.target.value);
            }}
            />
            <label for="admin"> Admin </label>
        </div>

        {/* submit button */}
        <Button
          variant="primary"
          type="submit"
          onClick={(e) => handleSubmit(e)}
        >
          Register
        </Button>
          
        {/* <Button
          onClick={()=> {navigate("./Login")}}
        >
          Login
        </Button> */}


        {/* display success message */}
        {register ? (
          <div>
          <p className="text-success">You Are Registered Successfully. Click here to add the rest of your details -></p>
          <Button
          variant="primary"
          type="submit"
          onClick={(e) => handleLogin(e)}
        >
          Update Profile
        </Button>
          </div>
          
        ) : (
          <p className="text-danger">You Are Not Registered</p>
        )}
      </Form>
    </>
  );
}