import React, { useState } from "react";
import { Form, Button } from "react-bootstrap";
import axios from "axios";
import Cookies from "universal-cookie";
import { useNavigate } from "react-router-dom";
import Account from "./Account";
import ForgotPass from "./ForgotPass";
import ReactDOM from "react-dom/client";


const cookies = new Cookies();


export default function Login(props) {
  // initial state
  const [wrongDisp, setWrongDisp] = useState(<div></div>);
  const [wrong, setWrong] = useState(false);
  const [userName, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [login, setLogin] = useState(false);

  const handleSubmit = (e) => {
    // prevent the form from refreshing the whole page
    e.preventDefault();

    // set configurations
    const configuration = {
      method: "get",
      url: "http://localhost:8080/api/students/validate/"+userName+"/"+password,
    };

    // make the API call
    axios(configuration)
      .then((result) => {
        // set the cookie
        cookies.set("TOKEN", result.data.token, {
          path: "/",
        });
        // redirect user to the auth page
        if(result.data == true){  
          setLogin(true);
        }
        else{
          setWrong(true);
          setWrongDisp = <div> Please provide a valid username and password!! </div>;
        }
        
      })
      .catch((error) => {
        error = new Error();
      });
  };

  if(login){
    const element = <Account userName = {userName} root = {props.root}/>;
    props.root.render(element);
  }

  if(wrong){
    return (
      <div>
        <div> Please provide a valid username and password!! </div>;
        <h2>Login</h2>
        <Form onSubmit={(e) => handleSubmit(e)}>
          {/* email */}
          <Form.Group controlId="formBasicEmail">
            <Form.Label>Email address</Form.Label>
            <Form.Control
              type="email"
              name="email"
              value={userName}
              onChange={(e) => setEmail(e.target.value)}
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
  
          {/* submit button */}
          <Button
            variant="primary"
            type="submit"
            onClick={(e) => handleSubmit(e)}
          >
            Login
          </Button>

  
          {/* display success message */}
          {login ? (
            <p className="text-success">You Are Logged in Successfully</p>
          ) : (
            <p className="text-danger">You Are Not Logged in</p>
          )}
        </Form>
      </div>
    );
  }


  return (
    <div>
      <h2>Login</h2>
      {wrongDisp}
      <Form onSubmit={(e) => handleSubmit(e)}>
        {/* email */}
        <Form.Group controlId="formBasicEmail">
          <Form.Label>Email address</Form.Label>
          <Form.Control
            type="email"
            name="email"
            value={userName}
            onChange={(e) => setEmail(e.target.value)}
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
            onClick={() => {
              const root = ReactDOM.createRoot(document.getElementById('root'));
              const element = <ForgotPass root = {root}/>;
              root.render(element);
            }}          >
            Forgot Password?
          </Button>

        {/* display success message */}
        {login ? (
          <p className="text-success">You Are Logged in Successfully</p>
        ) : (
          <p className="text-danger">You Are Not Logged in</p>
        )}
      </Form>
    </div>
  );
}

