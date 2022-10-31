import React from 'react';
import {Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import homeImage from "./Home.png";
import Register from "./Register";
import ReactDOM from "react-dom/client";
import Login from "./Login";

import "./home.css";
import { render } from 'react-dom';
const Home = (props) => {
    const navigate = useNavigate();

  return (
    <>
      <h2>Home Page</h2>
    <p>
        <Button
            variant="primary"
            type="submit"
            onClick={() => {
              const root = ReactDOM.createRoot(document.getElementById('root'));
              const element = <Register root = {root}/>;
              root.render(element);
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
              const root = ReactDOM.createRoot(document.getElementById('root'));
              const element = <Login root = {root}/>;
              root.render(element);
            }}
            >
            Login
        </Button>
    </p>

    <div>
      <img src={homeImage} alt="homeImage"/>;
    </div>

    </>
  );
}
export default Home;
