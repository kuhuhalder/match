import React from 'react';
import {Button } from "react-bootstrap";
import {Link} from 'react-router-dom';
import { useNavigate } from "react-router-dom";
import homeImage from "./images/Home.png";
import Register from "./Register";
import ReactDOM from "react-dom/client";
import Login from "./Login";
import {Redirect} from 'react-router-dom';
import "./Home.css";
import { render } from 'react-dom';
const Home = (props) => {
  const navigate = useNavigate();
  return (
    <>
     {/* <div>
      <img src={homeImage} alt="homeImage"/>;
    </div> */}
      {/* <h2>Home Page</h2> */}
    <p>
        <Button
            variant="primary"
            type="submit"
            
            onClick={() => {
              // const root = ReactDOM.createRoot(document.getElementById('root'));
              // const element = <Register root = {root}/>;
              // root.render(element);
              navigate("/register")
          
            }}
            >
            Create an Account
        </Button>
    </p>

    <p>
        <Button
            variant="primary"
            type="submit"
            onClick={() => {
              // const root = ReactDOM.createRoot(document.getElementById('root'));
              // const element = <Login root = {root}/>;
              // root.render(element);
              navigate("/login")
            }}
            >
            Login
        </Button>
    </p>

   

    </>
  );
}
export default Home;
