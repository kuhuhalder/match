import React, { useState } from "react";
import { Form, Button } from "react-bootstrap";
import axios from "axios";
import { Navigate, useNavigate, Link } from "react-router-dom";
import Login from "../students/Login";


export default function LoginAdmin(props) {
  const navigate = useNavigate()
  const [wrongDisp, setWrongDisp] = useState(<div></div>);
  const [wrong, setWrong] = useState(false);
  const [userName, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [login, setLogin] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    const configuration = {
      method: "get",
      url: "http://localhost:8080/api/students/validate/"+userName+"/"+password,
    };

    axios(configuration)
      .then((result) => {

        if(result.data == true && userName.endsWith("@match.com")){  
          setLogin(true);
          
        }
        else{
          setWrong(true);
        }
        
      })
      .catch((error) => {
        error = new Error();
      });
  };

  if(login && userName.endsWith("@match.com")){
    navigate("/viewaccount", {state:{userName:userName, password:password}})
  }else if(!userName.endsWith("@match.com"))
  {
    <p className="text-danger">Please use a valid @match.com email address!</p>
  }


  const handleForgotPassword=(e)=>{
    navigate("/forgotpass", {state:{id:userName, userName:userName}})

  }
  if(wrong){
    return (
        <div>
          <div> Please provide a valid username and password!! </div>
          <Login></Login>
        </div>
      )
    
  }

  return (
    <div>
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

        {!userName.endsWith("@match.com") ? (
          <p className="text-danger">Please register with a @match.com email</p>
        ) : (
          <p className="text-success">Valid email address!</p>
        )}
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
            onClick={(e) => {
            handleForgotPassword()
            }}          >
            Forgot Password?
          </Button>

        {login? (
          <p className="text-success">You Are Logged in Successfully</p>
        ) : (
          <p className="text-danger">Please login with a valid @match.com email address</p>
        )}
      </Form>

      <Link to='/registeradmin'>Don't have an account? Register here!</Link>
    </div>
  );
}

