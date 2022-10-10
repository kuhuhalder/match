import React from 'react';
import {Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import homeImage from "./Home.png";

import "./Home.css";
const Home = (props) => {
    const navigate = useNavigate();

  return (
    <>
      <h2>Home Page</h2>
    <p>
        <Button
            variant="primary"
            type="submit"
            onClick={() => navigate("/Register")}
            >
            Create an Account
        </Button>
    </p>

    <p>
        <Button
            variant="primary"
            type="submit"
            onClick={() => navigate("/Login")}
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
